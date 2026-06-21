import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';

export type LibraryDocument = Library & Document;

@Schema()
export class Library {
  @Prop({required: true})
  name!: string;

  @Prop({type: [{type: Types.ObjectId, ref: 'Book'}]})
  books!: Types.ObjectId[];
}   

export const LibrarySchema = SchemaFactory.createForClass(Library);