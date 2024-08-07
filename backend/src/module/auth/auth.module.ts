import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [JwtModule.register({}),DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService,AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
