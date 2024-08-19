import { Controller, Get, Param } from '@nestjs/common';
import { StatsService } from './stats.service';
import { Public } from '../auth/public.auth';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) { }

  @Public()
  @Get(":user_id")
  getStats(@Param("user_id") user_id: string) {
    return this.statsService.getStats(user_id)
  }
}
