import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRoot(process.env.DB_URL!), StudentModule, UserModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
