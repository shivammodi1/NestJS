import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class Tag {
  @Prop({required: true})
  name!: string;
}
