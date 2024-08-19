import { ConflictException, HttpException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants/auth.constants';

@Injectable()
export class ApikeyService {
    constructor(private readonly databaseService: DatabaseService,
        private jwtService: JwtService
    ) { }


    async createApiKey({ user_id, expires_at }: {
        user_id: string,
        expires_at: Date | string
    }) {

        let expiresAtDate: Date;

        if (typeof expires_at === 'string' || expires_at instanceof Date) {
            // Handle ISO string or Date object
            expiresAtDate = new Date(expires_at);
        } else if (expires_at && typeof expires_at === 'object' && 'year' in expires_at && 'month' in expires_at && 'day' in expires_at) {
            // Handle custom date object with year, month, day
            const { year, month, day } = expires_at;
            expiresAtDate = new Date(year, month - 1, day); // Month is 0-indexed in JS
        } else {
            throw new Error('Invalid date format');
        }
        const userInTable = await this.databaseService.apiKey.findFirst({
            where: {
                user_id,
            }
        })
        if (userInTable) throw new ConflictException("YOU ALREADY HAVE AN API KEY!!!")
        else {
            const apiKey = await this.jwtService.signAsync({
                sub: user_id
            }, {
                secret: jwtConstants.api_key_secret,
                expiresIn: 60 * 60 * 24 * 31,
            })
            if (apiKey) {
                const apiKeyInDB = await this.databaseService.apiKey.create({
                    data: {
                        user_id,
                        api_key: apiKey,
                        expires_at: expiresAtDate,
                    }
                })
                if (apiKeyInDB) return apiKeyInDB;
                else throw new NotImplementedException;
            }
            else throw new HttpException("INTERNAL SERVER ERROR", 500);
        }
    }

    async getApiKey(user_id: string) {
        const apiKey = await this.databaseService.apiKey.findFirst({
            where: {
                user_id
            }
        })

        if (apiKey) return apiKey
        else return { status: false }
    }

    async deleteApiKey({ user_id, api_key_id }: { user_id: string, api_key_id: number }) {
        const deletedApiKey = await this.databaseService.apiKey.delete({
            where: {
                user_id,
                api_key_id
            }
        })
        if (deletedApiKey) return deletedApiKey
        else throw new NotImplementedException;
    }

    async updateExpiry({ api_key_id, expires_at }: { api_key_id: number, expires_at: Date | string }) {
        let expiresAtDate: Date;

        if (typeof expires_at === 'string' || expires_at instanceof Date) {
            // Handle ISO string or Date object
            expiresAtDate = new Date(expires_at);
        } else if (expires_at && typeof expires_at === 'object' && 'year' in expires_at && 'month' in expires_at && 'day' in expires_at) {
            // Handle custom date object with year, month, day
            const { year, month, day } = expires_at;
            expiresAtDate = new Date(year, month - 1, day + 1); // Month is 0-indexed in JS
        } else {
            throw new Error('Invalid date format');
        }

        const updatedApiKey = await this.databaseService.apiKey.update({
            where: {
                api_key_id,
            },
            data: {
                expires_at: expiresAtDate,
            }
        })

        if (updatedApiKey) {
            console.log("UPDATED API KEY: ", updatedApiKey);
            return updatedApiKey
        } else throw new NotImplementedException

    }
}
