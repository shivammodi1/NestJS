import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type DeveloperDocument = HydratedDocument<Developer>;

@Schema({ timestamps: true })
export class Developer {
    @Prop({ required: true })
    name!: string;

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'Project' }],
        default: [],
    })
    projects!: Types.ObjectId[];
}
export const DeveloperSchema = SchemaFactory.createForClass(Developer);
