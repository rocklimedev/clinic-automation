import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Res,
  HttpStatus,
  Logger,
  Headers,
  Req,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { WhatsappService } from './whatsapp.service';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Controller('whatsapp')
export class WhatsappController {
  private readonly logger = new Logger(WhatsappController.name);

  constructor(
    private readonly whatsappService: WhatsappService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Meta Webhook verification (GET)
   * https://developers.facebook.com/docs/graph-api/webhooks/getting-started
   */
  @Get('webhook')
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
    @Res() res: Response,
  ) {
    const result = this.whatsappService.verifyWebhook(mode, token, challenge);
    if (result) {
      return res.status(HttpStatus.OK).send(result);
    }
    return res.status(HttpStatus.FORBIDDEN).send('Verification failed');
  }

  /**
   * Meta Webhook receiver (POST) – statuses + incoming messages
   */
  @Post('webhook')
  async handleWebhook(
    @Body() body: any,
    @Headers('x-hub-signature-256') signature: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // Always respond 200 quickly so Meta does not retry
    res.status(HttpStatus.OK).send('EVENT_RECEIVED');

    try {
      // Optional: verify signature
      const appSecret = this.configService.get<string>('WHATSAPP_APP_SECRET');
      if (appSecret && signature) {
        const expected =
          'sha256=' +
          crypto
            .createHmac('sha256', appSecret)
            .update((req as any).rawBody || JSON.stringify(body))
            .digest('hex');
        if (expected !== signature) {
          this.logger.warn('Invalid webhook signature');
          return;
        }
      }

      const entry = body?.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;

      if (!value) return;

      // Status updates (delivered / read / failed)
      if (value.statuses) {
        for (const status of value.statuses) {
          await this.whatsappService.handleStatusUpdate({
            id: status.id,
            status: status.status,
            timestamp: status.timestamp,
            errors: status.errors,
          });
        }
      }

      // Incoming messages (for future interactive feedback flows)
      if (value.messages) {
        for (const msg of value.messages) {
          this.logger.log(
            `Incoming message from ${msg.from}: type=${msg.type}`,
          );
          // TODO: handle button replies / text feedback here
        }
      }
    } catch (err) {
      this.logger.error('Webhook processing error', err);
    }
  }

  /**
   * Manual send endpoint (for testing / admin)
   */
  @Post('send-template')
  async sendTemplate(
    @Body()
    body: {
      to: string;
      templateName: string;
      languageCode?: string;
      components?: any[];
      patientId?: string;
      visitId?: string;
    },
  ) {
    return this.whatsappService.sendTemplateMessage(body);
  }
}
