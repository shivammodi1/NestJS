import { Controller, Get } from '@nestjs/common';
import { EvService } from './ev.service';

@Controller('ev')
export class EvController {
    constructor(private readonly evService: EvService) {}

    @Get('database-url')
    getDatabaseUrl() {
        return this.evService.getDatabaseUrl();
    }

    @Get('jwt-secret')
    getJwtSecret() {
        return this.evService.getJwtSecret();
    }
}
