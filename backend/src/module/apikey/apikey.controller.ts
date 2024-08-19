import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApikeyService } from './apikey.service';

@Controller('apikey')
export class ApikeyController {
  constructor(private readonly apikeyService: ApikeyService) { }


  @Get(":user_id")
  getApiKey(@Param("user_id") user_id: string) {
    return this.apikeyService.getApiKey(user_id);
  }

  @Post()
  createApiKey(@Body("user_id") user_id: string, @Body("expiry") expires_at: Date | string) {
    return this.apikeyService.createApiKey({ user_id, expires_at })
  }

  @Delete()
  deleteApiKey(@Body("api_key_id") api_key_id: number, @Body("user_id") user_id: string) {
    return this.apikeyService.deleteApiKey({ api_key_id, user_id });
  }


  @Patch()
  updateApiKeyExpiry(@Body("api_key_id") api_key_id: number, @Body("expiry") expires_at: Date | string) {
    return this.apikeyService.updateExpiry({ api_key_id, expires_at })
  }
}
