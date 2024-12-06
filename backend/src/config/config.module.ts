import { Module } from '@nestjs/common';
import { ConfigModule as Config, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        API_PORT: Joi.number().required(),

        DATABASE_URL: Joi.string().required(),

        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        JWT_REFRESH_EXPIRES_IN: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
