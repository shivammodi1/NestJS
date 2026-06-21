import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Developer, DeveloperSchema } from './schema/developer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schema/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Developer.name, schema: DeveloperSchema },
    ]),
  ],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
