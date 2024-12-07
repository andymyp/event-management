import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    PrismaModule,
    UserModule,
    AuthModule,
    EventModule,
  ],
})
export class AppModule {}
