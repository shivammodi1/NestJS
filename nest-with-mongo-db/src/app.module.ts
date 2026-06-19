import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRoot(process.env.DB_URL!), StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
