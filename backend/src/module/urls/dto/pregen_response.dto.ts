import { status, url_type } from '@prisma/client';
import { Expose } from 'class-transformer';

export class PreGenUrlResponse {
    @Expose()
    short_url: string;

    @Expose()
    url_type: url_type;

    @Expose()
    status: status;
}