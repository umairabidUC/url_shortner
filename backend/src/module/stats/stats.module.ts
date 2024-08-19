import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { DatabaseModule } from '../database/database.module';
import { UrlsService } from '../urls/urls.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule { }
