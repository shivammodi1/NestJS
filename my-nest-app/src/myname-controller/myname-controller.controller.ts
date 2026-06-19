import { Controller, Post } from '@nestjs/common';
import { UppercasePipe } from 'src/common/pipes/uppercase/uppercase.pipe';
import { Body } from '@nestjs/common';

@Controller('myname-controller')
export class MynameControllerController {
    @Post('custom')
    transformToUpperCase(@Body('name',new UppercasePipe()) name: string): string {
        return name;
    }
}
