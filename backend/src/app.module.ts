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
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard } from './module/auth/auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { StatsModule } from './module/stats/stats.module';

@Module({
  imports: [AuthModule, UrlsModule, UsersModule, DatabaseModule, LoggerModule, RedirectModule, LogoModule, JwtModule.register({}), StatsModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useFactory: (jwtService: JwtService, reflector: Reflector) => {
      return new AuthGuard(jwtService, reflector);
    },
    inject: [JwtService, Reflector],
  },],
})
export class AppModule {}
