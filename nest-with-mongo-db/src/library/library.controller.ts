import { Controller, Get, Inject, Post } from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
    constructor(@Inject() private libraryService: LibraryService) {}

    @Post('create')
    async createLibrary() {
        return this.libraryService.createLibrary();
    }

    @Get('all')
    async getAllLibraries() {
        return this.libraryService.getAllLibraries();
    }
}
