import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
    private students = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];

    // get all students
    getStudents(){
        return this.students;
    }

    // create a new student
    createStudent(id: number, name: string) {
        const newStudent = { id, name };
        this.students.push(newStudent);
        return newStudent;
    }

    // get student by id
    getStudentById(id: number) {
        const student = this.students.find(student=> student.id === id);
        if (!student) {
            throw new Error(`Student with id ${id} not found`);
        }
        return {message: `Student with id ${id} found`, student};
    }

    // update student details
    updateStudent(id: number, name: string) {
        const student = this.students.find(student => student.id === id);
        if (!student) {
            throw new Error(`Student with id ${id} not found`);
        }
        // Object.assign -> is used to copy the values of original object to the target object and update the target object with new values.
        // Object.assign(student, { name });
        // return {message: `Student with id ${id} updated`, student};
        
        student.name = name;
        return {message: `Student with id ${id} updated`, student};
    }

    // delete student
    deleteStudent(id: number) {
        // method 1
        // const studentIndex = this.students.findIndex(student => student.id === id);
        // if (studentIndex === -1) {
        //     throw new Error(`Student with id ${id} not found`);
        // }
        // const deletedStudent = this.students.splice(studentIndex, 1);
        // return {message: `Student with id ${id} deleted`, student: deletedStudent[0]};

        // method 2
        const student = this.students.find(student => student.id === id);
        if (!student) {
            throw new Error(`Student with id ${id} not found`);
        }

        this.students = this.students.filter(student => student.id !== id);
        return {message: `Student with id ${id} deleted`, student};

    }



}
