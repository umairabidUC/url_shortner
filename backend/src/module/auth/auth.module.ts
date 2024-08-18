import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { AuthGuard } from './auth.guard';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({}), // Register JwtModule
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AuthGuard,
    Reflector,
    JwtService // Ensure Reflector is provided
  ],
  exports: [AuthGuard], // Export AuthGuard if needed elsewhere
})
export class AuthModule {}
