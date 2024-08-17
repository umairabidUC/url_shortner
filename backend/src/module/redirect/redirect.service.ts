import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
@Injectable()
export class RedirectService {

    constructor(private readonly databaseService: DatabaseService) { }
    async redirect(short_url: string) {
        console.log("SHORT URL: ", short_url)
        const url = await this.databaseService.url.findUnique({
            where: {
                short_url,
            }
        })

        if (url) {

            return url.original_url;
        }
        else throw new NotFoundException;
    }
}
