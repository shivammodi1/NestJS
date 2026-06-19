import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('db-url')
  getDbUrl(){
    return this.appService.getDbUrl();
  }

  @Get('db-name')
  getDbName(){
    return this.appService.getDbName();
  }

}
