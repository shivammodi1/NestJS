import { Body, Controller, Get, Post, Put ,Delete} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}


    // create User
    @Post('addUser')
    async createUser(@Body() data: Partial<User>): Promise<User> {
        return this.userService.createUser(data);
    }

    @Get('getAllUsers')
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get('getUserById/:id')
    async getUserById(@Body('id') id: string) {
        return this.userService.getUserById(id);
    }

    @Put('updateUserById/:id')
    async updateUserById(@Body('id') id: string, @Body() userData: Partial<User>) {
        return this.userService.updateUserById(id, userData);
    }

    @Delete('deleteUserById/:id')
    async deleteUserById(@Body('id') id: string) {
        return this.userService.deleteUserById(id);
    }

}
