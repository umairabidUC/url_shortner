import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { UrlsModule } from './module/urls/urls.module';
import { UsersModule } from './module/users/users.module';
import { DatabaseModule } from './module/database/database.module';
import { LoggerModule } from './common/logger/logger.module';
import { RedirectModule } from './module/redirect/redirect.module';
import { LogoModule } from './module/logo/logo.module';

@Module({
  imports: [AuthModule, UrlsModule, UsersModule, DatabaseModule, LoggerModule, RedirectModule, LogoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
