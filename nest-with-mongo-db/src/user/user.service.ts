import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor( @InjectModel(User.name) private userModel: Model<UserDocument> ) {}

    async createUser(data: Partial<User>): Promise<User> {
        const createdUser = new this.userModel(data);
        return createdUser.save();
    }

    async getAllUsers() {
        const users = await this.userModel.find();
        return users;
    }

    async getUserById(id: string) {
        const user = await this.userModel.findById(id);
        return user;
    }

    async updateUserById(id: string, userData: Partial<User>) {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, userData, { new: true });
        return updatedUser;
    }

    async deleteUserById(id: string) {
        const deletedUser = await this.userModel.findByIdAndDelete(id);
        return deletedUser;
    }
}
