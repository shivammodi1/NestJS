import {Prop , Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address extends Document {
    @Prop()
    street!: string;

    @Prop()
    city!: string;   
}

