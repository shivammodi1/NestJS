import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
    @Prop({ required: true })
    title!: string;

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'Developer' }],
        default: [],
    })
    developers!: Types.ObjectId[];
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
