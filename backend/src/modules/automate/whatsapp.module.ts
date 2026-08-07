import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { WhatsappMessage } from './models/whatsapp-message.model';
import { WhatsappTemplate } from './models/whatsapp-template.model';

@Module({
  imports: [SequelizeModule.forFeature([WhatsappMessage, WhatsappTemplate])],
  controllers: [WhatsappController],
  providers: [WhatsappService],
  exports: [WhatsappService],
})
export class WhatsappModule {}
