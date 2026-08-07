import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'mysql',

  host: '116.206.104.225',
  port: 3306,
  username: 'spsyn8lm_clinic_user',
  password: '&8P@%*=l,jL3',
  database: 'spsyn8lm_clinic_automation',

  autoLoadModels: true,
  synchronize: false, // Set true only for local development if needed

  logging: console.log,

  define: {
    underscored: false,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
