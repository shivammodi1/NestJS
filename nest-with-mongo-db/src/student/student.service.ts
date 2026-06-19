import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './student.schema';

@Injectable()
export class StudentService {

    constructor(
        @InjectModel(Student.name)
        private studentModel: Model<StudentDocument>,
    ){}

    //1. insert student data into the database

    // Partial<Student> means sare data mile yeh jaruri nahi hai, kuch bhi data milega toh chalega
    // Promise<Student> means ki yeh function ek promise return karega jisme Student type ka data hoga
    async createStudent(data:Partial<Student>): Promise<Student> {
        // yeh new this.studentModel(data)
        // ek naya student document create karega jisme data pass kiya gaya hoga
        const createdStudent = new this.studentModel(data);
        return createdStudent.save();
    }

    // 2. Get all students from the database
    async getAllStudents() {
        // find() method ka use karke hum sare students ko database se fetch kar rahe hai
        const students = await this.studentModel.find();
        return students;
    }

    // 3. Get a student by id from the database
    async getStudentById(id:string){
        // findById() method ka use karke hum ek student ko id ke basis par database se fetch kar rahe hai
        const student = await this.studentModel.findById(id);
        return student;
    }

    // 4. Update a student by id in the database
    async updateStudentById(id:string, studentData: Partial<Student>){
        // findByIdAndUpdate() method ka use karke hum ek student ko id ke basis par database me update kar rahe hai
        const updatedStudent = await this.studentModel.findByIdAndUpdate(id, studentData, {new: true});
        return updatedStudent;
    }

    // 5. Delete a student by id from the database
    async deleteStudentById(id:string){
        // findByIdAndDelete() method ka use karke hum ek student ko id ke basis par database se delete kar rahe hai
        const deletedStudent = await this.studentModel.findByIdAndDelete(id);
        return deletedStudent;
    }


} 