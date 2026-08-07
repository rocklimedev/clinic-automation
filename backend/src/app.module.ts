import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModule } from '@nestjs/schedule';
import { getDatabaseConfig } from './config/database.config';

// Models
import { User } from './modules/users/models/user.model';
import { Role } from './modules/roles/models/role.model';
import { UserRole } from './modules/users/models/user-role.model';
import { Permission } from './modules/roles/models/permission.model';
import { RolePermission } from './modules/roles/models/role-permission.model';
import { Patient } from './modules/patients/models/patient.model';
import { PatientVisit } from './modules/patients/models/patient-visit.model';
import { WhatsappTemplate } from './modules/automate/models/whatsapp-template.model';
import { Automation } from './modules/automate/models/automation.model';
import { AutomationRun } from './modules/automate/models/automation-run.model';
import { WhatsappMessage } from './modules/automate/models/whatsapp-message.model';
import { FeedbackRequest } from './modules/automate/models/feedback-request.model';
import { ImportJob } from './modules/patients/models/import-job.model';
import { AuditLog } from './modules/engagement/models/audit-log.model';

// Feature modules
import { WhatsappModule } from './modules/automate/whatsapp.module';
import { AutomationsModule } from './modules/automate/automations.module';
import { PatientsModule } from './modules/patients/patients.module';
import { UsersModule } from './modules/users/users.module';
import { RbacModule } from './modules/roles/rbac.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),

    // Register all models so autoLoadModels + associations work
    SequelizeModule.forFeature([
      User,
      Role,
      UserRole,
      Permission,
      RolePermission,
      Patient,
      PatientVisit,
      WhatsappTemplate,
      Automation,
      AutomationRun,
      WhatsappMessage,
      FeedbackRequest,
      ImportJob,
      AuditLog,
    ]),

    ScheduleModule.forRoot(),

    WhatsappModule,
    AutomationsModule,
    PatientsModule,
    UsersModule,
    RbacModule,
  ],
})
export class AppModule {}
