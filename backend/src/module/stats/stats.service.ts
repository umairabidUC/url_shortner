import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class StatsService {
    constructor(private readonly databaseService: DatabaseService
    ) { }

    async getStats(user_id: string) {
        // 
        const urlClicks = await this.databaseService.url.findMany({
            where: {
                user_id,
                is_pre_generated: false,
                url_click: {
                    some: {}, // Ensures there's at least one associated UrlClick record
                },
            },
            select: {
                url_id: true,
                original_url: true,
                short_url: true,
                _count: {
                    select: { url_click: true }, // Counts the number of associated UrlClick records
                },
                url_click: {
                    select: {
                        click_id: true,
                        access_date: true,
                        access_time: true,
                        ip_address: true,
                        user_agent: true,
                        referrer: true,
                        country: true,
                        city: true,
                    },
                },
            },
        });

        // Add a property 'urlClicksCount' to each url object
        if (urlClicks) return urlClicks.map((url) => ({
            ...url,
            urlClicksCount: url._count.url_click, // Total number of clicks for this URL
        }));
        else throw new NotFoundException
    }


}
