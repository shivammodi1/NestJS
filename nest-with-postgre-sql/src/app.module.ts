import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DB_URL,
    autoLoadEntities: true, // Entities automatically load karo
    synchronize: true, // TypeORM entities ko dekhkar automatically tables create/update kar deta hai.
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


