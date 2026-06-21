import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {Tag} from './tag.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({required: true})
    title!: string;

    @Prop({type: [Tag]})
    tags!: Tag[];

}

export const ProductSchema = SchemaFactory.createForClass(Product); 