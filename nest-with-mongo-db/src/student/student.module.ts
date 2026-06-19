import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Student, StudentSchema } from './student.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

@Module({
  // yahan bhi humne MongooseModule ko import kiya hai aur Student schema ko register kiya hai.
  // Ye humein database ke saath interact karne mein madad karega.
  imports: [MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }])],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
