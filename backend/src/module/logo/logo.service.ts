import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class LogoService {
    constructor(private readonly databaseService: DatabaseService) { }

    async addLogo(user_id: string, logo_path: string) {
        console.log("USER_ID: ", user_id)
        console.log("LOGO_PATH: ", logo_path)
        const logo = await this.databaseService.logo.create({
            data: {
                user_id,
                logo_path,
            }
        })

        if (logo) return logo;
        else throw new NotImplementedException;

    }

    async getLogos(user_id) {
        const logos = await this.databaseService.logo.findMany({
            where: {
                user_id
            }
        })

        if (logos) return logos
        else throw new NotFoundException;
    }

    async deleteLogo(logo_path: string) {
        const logo_asset_path = logo_path.split("logos")[1].split(".")[0]
        console.log(logo_asset_path)
        const deletedLogo = await cloudinary.uploader.destroy(`logos${logo_asset_path}`)

        if (deletedLogo) {
            console.log("DELETED LOGO: ", deletedLogo)
            return deletedLogo
        }
        else throw new NotFoundException
    }
}
