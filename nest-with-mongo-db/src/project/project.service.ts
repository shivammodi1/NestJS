import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Developer, DeveloperDocument } from './schema/developer.schema';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schema/project.schema';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Developer.name) private developerModel: Model<DeveloperDocument>,
        @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    ) {}

    async seed(): Promise<{ dev1: Developer; dev2: Developer }> {
        const [projectA, projectB] = await Promise.all([
            this.projectModel.create({ title: 'Nest CRM'}),
            this.projectModel.create({ title: 'Mongo Analytics'})
        ]);

        const [dev1, dev2] = await Promise.all([
            this.developerModel.create({
                name: 'Farzeen',
                projects: [projectA._id, projectB._id],
            }),
            this.developerModel.create({
                name: 'Huzaifa',
                projects: [projectA._id],
            })
        ])

        await Promise.all([
            this.projectModel.findByIdAndUpdate(projectA._id, {
                $set: { developers: [dev1._id, dev2._id]}
            }),
            this.projectModel.findByIdAndUpdate(projectB._id, {
                $set: { developers: [dev1._id]}
            })
        ]) 
        return { dev1, dev2 };
    }
    async getDevelopers(): Promise<Developer[]>{
        return this.developerModel.find().populate('projects').exec();
    }
    async getProjects(): Promise<Project[]>{
        return this.projectModel.find().populate('developers').exec();
    }
}
