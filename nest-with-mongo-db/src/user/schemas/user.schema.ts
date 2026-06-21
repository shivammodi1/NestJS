import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from './address.schema';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
    @Prop()
    name!: string;

    @Prop()
    email!: string;

    // here we embed the Address schema as a property of the User schema
    @Prop({ type: Address })
    address!: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);