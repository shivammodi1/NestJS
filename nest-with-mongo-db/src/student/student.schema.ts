import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

// ex type create kiya hu jo ki StudentDocument ka type hoga jo ki Student aur Document ka combination hoga
// Student -> ye mera schema hoga jo ki Student ka data define karega
// Document -> ye mongoose ka document hoga jo ki Student schema ka data ko represent karega
export type StudentDocument = Student & Document;

@Schema({timestamps: true})
export class Student{
    @Prop({required: true})
    name!: string;

    @Prop({unique: true})
    email?: string;

    @Prop({required: true})
    age!: number;
}

// ye StudentSchema ko create kar raha hu jo ki Student class ka schema hoga
// using SchemaFactory.createForClass(Student) method ka use karke hum Student class ka schema create kar rahe hai 
export const StudentSchema = SchemaFactory.createForClass(Student);

// Student Class
//       ↓
// StudentSchema
//       ↓
// forFeature()
//       ↓
// Register as "Student"
//       ↓
// @InjectModel("Student")
//       ↓
// studentModel
//       ↓
// new studentModel()
//       ↓
// save() / find() / update() / delete()