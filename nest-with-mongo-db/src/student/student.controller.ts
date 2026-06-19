import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { Post } from '@nestjs/common';
import { Student } from './student.schema';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Get()
    test() {
        return "Hello from student controller";
    }

    // 1. Create a new student
    @Post('addStudent')
    async addStudent(@Body() data: Partial<Student>) {
        const student = await this.studentService.createStudent(data);
        return student;
    }

    // 2. Get all students
    @Get('getAllStudents')
    async getAllStudents() {
        const students = await this.studentService.getAllStudents();
        return students;
    }

    // 3. Get a student by id
    @Get('getStudentById/:id')
    async getStudentById(@Param('id') id: string): Promise<Student | null> {
        const student = await this.studentService.getStudentById(id);
        return student;
    }

    // 4. Update a student by id
    @Put('updateStudentById/:id')
    async updateStudentById(@Param ('id') id:string , @Body() studentData: Partial<Student>): Promise<Student | null> {
        // const updatedStudent = await this.studentService.updateStudentById(id, studentData);
        
        // method2
        const updatedStudent = await this.studentService.updateStudentById(id, {
            name: studentData.name,
            email: studentData.email,
            age: studentData.age    
        });
        return updatedStudent;
    }

    // 5. Delete a student by id
    @Delete('deleteStudentById/:id')
    async deleteStudentById(@Param('id') id: string): Promise<Student | null> {
        const deletedStudent = await this.studentService.deleteStudentById(id);
        return deletedStudent;
    }

}
