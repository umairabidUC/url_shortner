import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class StatsService {
    constructor(private readonly databaseService: DatabaseService){}

    async getStats(url_id: string){
        const stats= await this.databaseService.urlClick.findMany({
            where:{
                url_id,
            }
        })
        if(stats){
            return stats;
        } else throw new NotFoundException;
    }

    
}
