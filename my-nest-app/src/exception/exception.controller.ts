import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../filters/http-exception/http-exception.filter';

@Controller('exception')
@UseFilters(HttpExceptionFilter)
export class ExceptionController {

    @Get('hello/:id')
    getHello(@Param('id', ParseIntPipe) id: number) {
        return { message: `hello ${id}` };
    }

}

// Why we use ParseIntPipe 
// It converts the string parameter to an integer, ensuring that the ID is a valid number.
