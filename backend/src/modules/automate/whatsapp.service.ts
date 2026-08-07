import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import axios, { AxiosInstance } from 'axios';
import { WhatsappMessage } from './models/whatsapp-message.model';
import { WhatsappTemplate } from './models/whatsapp-template.model';
import { Patient } from '../patients/models/patient.model';
import { PatientVisit } from '../patients/models/patient-visit.model';

export interface TemplateComponentParameter {
  type: 'text' | 'currency' | 'date_time' | 'image' | 'document' | 'video';
  text?: string;
  parameter_name?: string; // for named parameters
  image?: { link: string };
  document?: { link: string; filename?: string };
  video?: { link: string };
  currency?: { fallback_value: string; code: string; amount_1000: number };
  date_time?: { fallback_value: string };
}

export interface TemplateComponent {
  type: 'header' | 'body' | 'button';
  parameters?: TemplateComponentParameter[];
  sub_type?: string; // for buttons
  index?: number;
}

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);
  private readonly client: AxiosInstance;
  private readonly phoneNumberId: string;
  private readonly accessToken: string;
  private readonly apiVersion: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(WhatsappMessage)
    private readonly messageModel: typeof WhatsappMessage,
    @InjectModel(WhatsappTemplate)
    private readonly templateModel: typeof WhatsappTemplate,
  ) {
    this.phoneNumberId = this.configService.getOrThrow<string>(
      'WHATSAPP_PHONE_NUMBER_ID',
    );
    this.accessToken = this.configService.getOrThrow<string>(
      'WHATSAPP_ACCESS_TOKEN',
    );
    this.apiVersion = this.configService.get<string>(
      'WHATSAPP_API_VERSION',
      'v21.0',
    );

    this.client = axios.create({
      baseURL: `https://graph.facebook.com/${this.apiVersion}`,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      timeout: 15000,
    });
  }

  /**
   * Send a pre-approved template message via Meta WhatsApp Cloud API.
   * This is the only way to initiate conversation outside the 24h window.
   */
  async sendTemplateMessage(params: {
    to: string; // E.164 without + or with, Meta accepts both
    templateName: string; // meta_template_name
    languageCode?: string;
    components?: TemplateComponent[];
    patientId?: string;
    visitId?: string;
    templateId?: string;
  }): Promise<WhatsappMessage> {
    const {
      to,
      templateName,
      languageCode = 'en',
      components = [],
      patientId,
      visitId,
      templateId,
    } = params;

    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to.replace(/\D/g, ''), // digits only
      type: 'template',
      template: {
        name: templateName,
        language: { code: languageCode },
        ...(components.length > 0 && { components }),
      },
    };

    this.logger.log(`Sending template "${templateName}" to ${to}`);

    try {
      const { data } = await this.client.post(
        `/${this.phoneNumberId}/messages`,
        payload,
      );

      const metaMessageId = data?.messages?.[0]?.id ?? null;

      const record = await this.messageModel.create({
        patient_id: patientId!,
        visit_id: visitId ?? null,
        template_id: templateId ?? null,
        meta_message_id: metaMessageId,
        status: 'sent',
        sent_at: new Date(),
      });

      this.logger.log(`Template sent. wamid=${metaMessageId}`);
      return record;
    } catch (error: any) {
      const reason =
        error?.response?.data?.error?.message ||
        error?.message ||
        'Unknown WhatsApp API error';

      this.logger.error(`Failed to send template: ${reason}`, error?.stack);

      // Still create a failed record for audit
      if (patientId) {
        await this.messageModel.create({
          patient_id: patientId,
          visit_id: visitId ?? null,
          template_id: templateId ?? null,
          status: 'failed',
          failed_reason: reason,
          sent_at: new Date(),
        });
      }

      throw new BadRequestException(`WhatsApp send failed: ${reason}`);
    }
  }

  /**
   * Convenience helper used by automation runner.
   * Looks up the template record and patient, then sends.
   */
  async sendAutomationTemplate(
    template: WhatsappTemplate,
    patient: Patient,
    visit: PatientVisit,
    bodyParameters: string[] = [],
  ): Promise<WhatsappMessage> {
    const to = patient.whatsapp_number || patient.mobile;
    if (!to) {
      throw new BadRequestException('Patient has no WhatsApp/mobile number');
    }

    const components: TemplateComponent[] = [];
    if (bodyParameters.length > 0) {
      components.push({
        type: 'body',
        parameters: bodyParameters.map((text) => ({ type: 'text', text })),
      });
    }

    return this.sendTemplateMessage({
      to,
      templateName: template.meta_template_name!,
      languageCode: template.language || 'en',
      components,
      patientId: patient.id,
      visitId: visit.id,
      templateId: template.id,
    });
  }

  /**
   * Handle incoming webhook status updates from Meta
   * (delivered, read, failed)
   */
  async handleStatusUpdate(payload: {
    id: string; // meta_message_id (wamid)
    status: string;
    timestamp?: string;
    errors?: any[];
  }): Promise<void> {
    const message = await this.messageModel.findOne({
      where: { meta_message_id: payload.id },
    });

    if (!message) {
      this.logger.warn(`Status update for unknown message ${payload.id}`);
      return;
    }

    const updates: Partial<WhatsappMessage> = {
      status: payload.status,
    };

    if (payload.status === 'delivered') {
      updates.delivered_at = payload.timestamp
        ? new Date(Number(payload.timestamp) * 1000)
        : new Date();
    } else if (payload.status === 'read') {
      updates.read_at = payload.timestamp
        ? new Date(Number(payload.timestamp) * 1000)
        : new Date();
    } else if (payload.status === 'failed') {
      updates.failed_reason = JSON.stringify(payload.errors ?? []);
    }

    await message.update(updates);
    this.logger.log(`Message ${payload.id} → ${payload.status}`);
  }

  /**
   * Verify webhook challenge from Meta
   */
  verifyWebhook(mode: string, token: string, challenge: string): string | null {
    const verifyToken = this.configService.get<string>(
      'WHATSAPP_WEBHOOK_VERIFY_TOKEN',
    );
    if (mode === 'subscribe' && token === verifyToken) {
      return challenge;
    }
    return null;
  }
}
