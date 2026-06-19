import { Controller, Get, UseGuards } from '@nestjs/common';

// Roles decorator → route pe allowed roles define karta hai
import { Roles } from 'src/guards/role/role.decorator';

// Role enum → predefined roles (Admin, User etc.)
import { Role } from 'src/guards/role/role.enums';

// RoleGuard → check karta hai user ka role allowed hai ya nahi
import { RoleGuard } from 'src/guards/role/role.guard';

@Controller('user-roles')
export class UserRolesController {

    // Only Admin can access this route
    @Get('admin-data')
    @UseGuards(RoleGuard) // Guard runs before controller method
    @Roles(Role.Admin)    // Only Admin allowed
    getAdminData() {
        return 'This data is only accessible to Admins.';
    }

    // Both User and Admin can access this route
    @Get('user-data')
    @UseGuards(RoleGuard) // Role check enabled
    @Roles(Role.User, Role.Admin) // Multiple roles allowed
    getUserData() {
        return 'This data is accessible to Users and Admins.';
    }

    // No role required, public access
    @Get('public-data')
    getPublicData() {
        return 'This data is accessible to everyone, no role required.';
    }
}