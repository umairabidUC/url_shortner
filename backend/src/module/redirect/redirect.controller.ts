import { Controller, Get, HttpRedirectResponse, Param, Res } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { Redirect } from '@nestjs/common';

@Controller('redirect')
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) { }

  @Get(":short_url")
  async redirect(@Param("short_url") short_url: string, @Res() res) {
    const original_url = await this.redirectService.redirect(short_url)
    if (original_url) {

      console.log("ORIGINAL URL: ", original_url)
      res.status(302).redirect(original_url)
    }
  }
}
