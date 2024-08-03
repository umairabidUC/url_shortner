import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UrlsService {
  constructor(private readonly databaseService: DatabaseService){}
  async create(createUrlDto: Prisma.UrlCreateInput) {
    return await this.databaseService.url.create({
      data: createUrlDto
    });
  }

  async findAll() {
    return await this.databaseService.url.findMany();
  }

  async findOne(id: string) {

      const url = await this.databaseService.url.findUnique({
        where: {
          url_id:id,
        }
      })
      if(url) return url
      else throw new NotFoundException();
    
  }

  async update(id: string, updateUrlDto: Prisma.UrlUpdateInput) {
    return `This action updates a #${id} url`;
  }

  async remove(id: string) {
    try{

      const url = await this.databaseService.url.delete({
        where:{
          url_id: id
        }
      });
      return url
    } catch(err) {
      throw new NotFoundException();
    }

  }
}
