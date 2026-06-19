import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { EmployeeModule } from './employee/employee.module';
import { CategoryModule } from './category/category.module';
import { StudentModule } from './student/student.module';
import { CustomersModule } from './customers/customers.module';
import { MynameControllerController } from './myname-controller/myname-controller.controller';
import { ProductController } from './product/product.controller';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionController } from './exception/exception.controller';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { EvService } from './ev/ev.service';
import { EvController } from './ev/ev.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [EmployeeModule, CategoryModule, StudentModule, CustomersModule, ConfigModule.forRoot({ isGlobal: true }) , MongooseModule.forRoot(process.env.DB_URL!)],
  controllers: [AppController, UserController, MynameControllerController, ProductController, UserRolesController, ExceptionController, DatabaseController, EvController],
  providers: [AppService, ProductService, DatabaseService, EvService],
})
// NestModule is an interface that allows us to configure middleware in our application 
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply the LoggerMiddleware to all routes under '*' means all routes
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
