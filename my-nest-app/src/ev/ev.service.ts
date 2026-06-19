import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class EvService {
    constructor(private configService: ConfigService) {}

    getDatabaseUrl(){
        return this.configService.get<string>('DB_URL');
    }

    getJwtSecret(){
        return this.configService.get<string>('JWT_SECRET');
    }
}
