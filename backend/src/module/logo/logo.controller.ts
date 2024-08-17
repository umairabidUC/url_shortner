import { Body, Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { LogoService } from './logo.service';

@Controller('logo')
export class LogoController {
  constructor(private readonly logoService: LogoService) { }

  @Get(":user_id")
  getLogos(@Param("user_id") user_id: string) {
    return this.logoService.getLogos(user_id)
  }

  @Post()
  addLogo(@Body("user_id") user_id: string, @Body("logo_path") logo_path: string) {
    return this.logoService.addLogo(user_id, logo_path);
  }
  @Delete()
  deleteLogo(@Body("logo_path") logo_path: string) {
    return this.logoService.deleteLogo(logo_path)
  }
}
