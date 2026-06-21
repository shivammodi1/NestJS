import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Profile } from './profile.schema';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop({ required: true })
  email!: string;
  
  @Prop({ required: true })
  password!: string;

    // Reference to the Profile schema
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Profile' })
    profile!: Profile;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

