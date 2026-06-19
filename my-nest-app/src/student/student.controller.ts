import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { Body } from '@nestjs/common';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    // get all students
    @Get('listOfStudents')
    getStudents() {
        return this.studentService.getStudents();
    }

    // get student by id
    @Get(':id')
    getStudentById(@Param('id') id: number) {
        return this.studentService.getStudentById(Number(id));
    }

    // create a new student
    @Post('createStudent')
    createStudent(@Body() studentData: { id: number; name: string }) {
        return this.studentService.createStudent(studentData.id, studentData.name);
    }

    // update student details
    @Put(':id')
    updateStudent(@Param('id') id: number, @Body() studentData: { name: string }) {
        return this.studentService.updateStudent(Number(id), studentData.name);
    }

    // delete student
    @Delete(':id')
    deleteStudent(@Param('id') id: number) {
        return this.studentService.deleteStudent(Number(id));
    }
}
