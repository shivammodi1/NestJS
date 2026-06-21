import { Injectable } from '@nestjs/common';
import { Employee } from './schemas/employee.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Profile } from './schemas/profile.schema';


@Injectable()
export class EmployeeService {
    constructor(@InjectModel(Employee.name) private employeeModel: Model<Employee>,
                @InjectModel(Profile.name) private profileModel: Model<Profile>) {}
    
    async createEmployee():Promise<Employee>{
        // First, create a profile document
        const profile = new this.profileModel({
            firstName: 'shivam',
            lastName: 'modi',
            age: 22
        });
        const savedProfile = await profile.save();
        // Then, create an employee document that references the profile
        const employee = new this.employeeModel({
            email: 'smodi@gmail.com',
            password: 'password123',
            profile: savedProfile._id
        });
        return employee.save();
    }

    async findAll(): Promise<Employee[]> {
        // Use populate to fetch the associated profile data
        // without using populate, it will return only the ObjectId of the profile
        // with populate, it will return the full profile document
        const employeeProfiles = await this.employeeModel.find().populate('profile').exec();
        return employeeProfiles;
    }
}
