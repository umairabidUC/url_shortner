import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Prisma, url_type } from '@prisma/client';
import { UrlsService } from './urls.service';
import { Serialize } from 'src/common/decorators/serialize.decorator';
import { UrlResponse } from './dto/url_user_response.dto';
import { PreGenUrlResponse } from './dto/pregen_response.dto';



@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) { }

  @Post()
  create(@Body() createUrlDto: Prisma.UrlCreateInput) {
    return this.urlsService.create(createUrlDto);
  }

  @Get()
  findAll() {
    return this.urlsService.findAll();
  }

  @Serialize(UrlResponse)
  @Get('/user/:user_id')
  findForUser(@Param('user_id') user_id: string) {
    return this.urlsService.findForUser(user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlsService.findOne(id);
  }
  @Get("tags/:user_id")
  getTags(@Param("user_id") user_id: string) {
    return this.urlsService.getTags(user_id)
  }

  @Post("tags")
  createTag(@Body("user_id") user_id: string, @Body("tag_name") tag_name: string) {
    return this.urlsService.createTag(user_id, tag_name)
  }

  @Post()
  addUrl(@Body("original_url") original_url: string, @Body("short_url") short_url: string, @Body("user_id") user_id: string,) {
    return this.urlsService.addUrl({ original_url, short_url, user_id })
  }


  @Delete()
  remove(@Body('short_url') short_url: string, @Body("user_id") user_id: string) {
    return this.urlsService.deleteUrl(short_url, user_id);
  }

  @Serialize(PreGenUrlResponse)
  @Get("pregen/:user_id")
  getPreGen(@Param("user_id") user_id: string) {
    return this.urlsService.getPreGen(user_id)
  }

  @Post("pregen")
  generateUrl(@Body("user_id") user_id: string, @Body("short_url") short_url: string) {
    return this.urlsService.generateUrls(user_id, short_url)
  }
  @Patch("pregen")
  updatePregenUrl(@Body("user_id") user_id: string, @Body("short_url") short_url: string, @Body("url_type") url_type: url_type, @Body("original_url") original_url: string) {

    return this.urlsService.updatePreGenUrl(user_id, original_url, short_url, url_type)

  }

  @Patch()
  updateUrl(@Body("user_id") user_id: string, @Body("original_url") original_url: string, @Body("short_url") short_url: string, @Body("url_type") url_type: url_type, @Body("tag_id") tag_id: number) {

    return this.urlsService.updateUrl({ user_id, original_url, short_url, url_type, tag_id })

  }
}
