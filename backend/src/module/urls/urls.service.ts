import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { Prisma, url_type } from '@prisma/client';
import { DatabaseService } from '../database/database.service';


@Injectable()
export class UrlsService {
  constructor(private readonly databaseService: DatabaseService) { }
  async create(createUrlDto: Prisma.UrlCreateInput) {
    return await this.databaseService.url.create({
      data: createUrlDto
    });
  }
  async deleteUrl(short_url: string, user_id: string) {
    const deletedUrl = await this.databaseService.url.delete({
      where: {
        user_id,
        short_url,
      }
    })

    if (deletedUrl) {
      return deletedUrl
    }
    else throw new NotFoundException;
  }
  async findAll() {
    return await this.databaseService.url.findMany();
  }


  async getTags(user_id: string) {
    const tag = await this.databaseService.urlTag.findMany(
      {
        where: {
          user_id
        }
      }
    )

    if (tag) return tag
    else throw new NotFoundException;
  }


  async createTag(user_id: string, tag_name: string) {
    const newTag = await this.databaseService.urlTag.create({
      data: {
        user_id,
        tag_name,
      }
    })
    if (newTag) return newTag
    else throw new NotFoundException
  }
  async addUrl({ original_url, short_url, user_id }: { original_url: string, short_url: string, user_id: string }) {
    const newUrl = await this.databaseService.url.create({
      data: {
        user_id,
        original_url,
        short_url,
      }
    })

    if (newUrl) return newUrl;
    else throw new NotImplementedException;
  }

  async findForUser(user_id: string) {
    const urls = await this.databaseService.url.findMany({
      where: {
        user_id,
        is_pre_generated: false
      }
    })
    if (urls) return urls
    else throw new NotFoundException("You have no URLS");
  }
  async findOne(id: string) {

    const url = await this.databaseService.url.findUnique({
      where: {
        url_id: id,
      }
    })
    if (url) return url
    else throw new NotFoundException();

  }

  async remove(id: string) {
    try {

      const url = await this.databaseService.url.delete({
        where: {
          url_id: id
        }
      });
      return url
    } catch (err) {
      throw new NotFoundException();
    }

  }

  async getPreGen(user_id: string) {
    const preGen = await this.databaseService.url.findMany({
      where: {
        user_id,
        is_pre_generated: true
      }
    })

    if (preGen) {
      return preGen
    } else throw new NotFoundException;

  }

  async generateUrls(user_id: string, short_url: string) {
    const generatedUrl = await this.databaseService.url.create({
      data: {
        user_id,
        short_url,
        is_pre_generated: true,
        status: "inactive"
      }
    })

    if (generatedUrl) {
      return generatedUrl
    } else throw new NotFoundException;
  }

  async updatePreGenUrl(short_url: string, original_url: string, user_id: string, url_type: url_type) {
    const updatedUrl = await this.databaseService.url.update({
      where: {
        user_id,
        short_url
      },
      data: {
        original_url,
        url_type,
        is_pre_generated: false
      }
    })

    if (updatedUrl) {
      return updatedUrl
    }
    else throw new NotFoundException;
  }


  async updateUrl({ user_id, original_url, short_url, url_type, tag_id }: { user_id: string, original_url: string, short_url: string, url_type: url_type, tag_id: number }) {
    const updatedUrl = await this.databaseService.url.update({
      where: {
        user_id,
        short_url
      },
      data: {
        original_url,
        url_type,
        tag_id
      }
    })

    if (updatedUrl) return updatedUrl
    else throw new NotImplementedException
  }
}
