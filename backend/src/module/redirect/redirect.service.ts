import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Request } from 'express';
import * as geoip from "geoip-lite"
@Injectable()
export class RedirectService {

    constructor(private readonly databaseService: DatabaseService) { }
    async redirect(short_url: string, req: Request) {
        console.log("SHORT URL: ", short_url)
        const url = await this.databaseService.url.findUnique({
            where: {
                short_url,
            }
        })

        if (url) {
            const ip = req.ip;
            const userAgent = req.get('User-Agent') || '';
            const geo = geoip.lookup(ip) || {};
            const city = geo.city || 'Unknown';
            const country = geo.country || 'Unknown';
            const accessDate = new Date();
            const accessTime = new Date();
            const url_click = await this.databaseService.urlClick.create({
                data:{
                    ip_address: ip,
                    user_agent: userAgent,
                    city: city,
                    country: country,
                    access_date: accessDate,
                    access_time: accessTime,
                    url_id: url.url_id,
                }
            })
            if(url_click) console.log(url_click);

            return url.original_url;
        }
        else throw new NotFoundException;
    }
}
