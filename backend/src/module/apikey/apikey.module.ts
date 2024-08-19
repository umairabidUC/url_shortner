import { Module } from '@nestjs/common';
import { ApikeyService } from './apikey.service';
import { ApikeyController } from './apikey.controller';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants/auth.constants';

@Module({
  imports: [DatabaseModule, JwtModule.register({
    secret: jwtConstants.api_key_secret
  })],
  controllers: [ApikeyController],
  providers: [ApikeyService],
})
export class ApikeyModule { }
