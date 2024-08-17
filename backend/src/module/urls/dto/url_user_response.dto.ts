import { status, url_type } from '@prisma/client';
import { Expose } from 'class-transformer';

export class UrlResponse {
    @Expose()
    original_url: string;

    @Expose()
    short_url: string;

    @Expose()
    status: status;

    @Expose()
    url_type: url_type;

    @Expose()
    tag_id: number;
}