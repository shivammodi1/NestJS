import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return 'Hello shivam modi!';
  }
  
  getDbUrl(){
    const url = this.configService.get<string>('DB_URL');
    return url;
  }
  getDbName(){
    const name = this.configService.get<string>('DB_NAME');
    return name;
  }
}

