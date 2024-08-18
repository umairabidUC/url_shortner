import { Controller, Get, HttpRedirectResponse, Param, Req, Res } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { Redirect } from '@nestjs/common';
import { Public } from '../auth/public.auth';
import { Request, Response } from 'express';

@Public()
@Controller('redirect')
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) { }

  @Get(":short_url")
  async redirect(@Param("short_url") short_url: string, @Req() req: Request, @Res() res: Response) {
    const original_url = await this.redirectService.redirect(short_url, req)
    if (original_url) {
      
      console.log("ORIGINAL URL: ", original_url)
      res.status(302).redirect(original_url)
    } else {
      res.status(404).send('URL not found');
    }
  }
}
