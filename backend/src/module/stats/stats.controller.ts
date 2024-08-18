import { Controller, Get, Param } from '@nestjs/common';
import { StatsService } from './stats.service';
import { Public } from '../auth/public.auth';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Public()
  @Get(":url_id")
  getStats(@Param("url_id") url_id: string){
    return this.statsService.getStats(url_id)
  }
}
