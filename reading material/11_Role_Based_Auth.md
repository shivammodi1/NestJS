# NestJS Role-Based Access Control (RBAC) - Complete Implementation

## 📋 Single File: `role-based-access-control.ts`

```typescript
// ============================================
// FILE: role.enums.ts
// ============================================
export enum Role {
    User = 'user',
    Admin = 'admin',
}

// ============================================
// FILE: role.decorator.ts
// ============================================
import { SetMetadata } from '@nestjs/common';

// Custom key for storing roles in NestJS metadata system
export const ROLES_KEY = 'roles';

/**
 * Custom decorator to define allowed roles for a route
 * 
 * @param roles - List of roles allowed to access the route
 * 
 * @example
 * @Roles('admin', 'user')
 * @Get('profile')
 * getProfile() { ... }
 * 
 * @example
 * @Roles(Role.Admin)
 * @Delete('user/:id')
 * deleteUser() { ... }
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// ============================================
// FILE: role.guard.ts
// ============================================
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './role.decorator';
import { Role } from './role.enums';

/**
 * Role Guard - Controls access based on user roles
 * 
 * This guard checks if the current user has the required role to access
 * a particular route. It reads metadata from @Roles() decorator and
 * compares it with the user's role from request headers.
 * 
 * HOW IT WORKS:
 * 1. Reads roles from @Roles() decorator using Reflector
 * 2. If no roles defined → Allow access (public route)
 * 3. Gets user role from 'x-user-role' header
 * 4. Checks if user role matches any allowed role
 * 5. Returns true (allow) or false (deny)
 */
@Injectable()
export class RoleGuard implements CanActivate {

  // Inject Reflector to read metadata set by @Roles() decorator
  constructor(private readonly reflector: Reflector) {}

  /**
   * Main method that determines if the request should be allowed
   * 
   * @param context - Execution context containing request details
   * @returns boolean - true = allow access, false = deny access
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // STEP 1: Read roles from @Roles() decorator
    // getAllAndOverride gets metadata from both method and class level
    // Priority: Method level > Class level
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [
        context.getHandler(), // Current API method (GET, POST, etc.)
        context.getClass(),   // Controller class
      ],
    );

    // STEP 2: If no roles defined, allow access (public route)
    if (!requiredRoles) {
      return true;
    }

    // STEP 3: Get the HTTP request object
    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string>;
    }>();

    // STEP 4: Extract user role from request headers
    // Example: x-user-role: admin
    const userRole = request.headers['x-user-role'];

    // STEP 5: Check if user role is allowed
    // If user role doesn't match any required role → DENY ACCESS
    if (!requiredRoles.includes(userRole as Role)) {
      return false;
    }

    // STEP 6: Role matches → ALLOW ACCESS
    return true;
  }
}

// ============================================
// USAGE EXAMPLE: app.controller.ts
// ============================================
import { Controller, Get, Post, Delete, UseGuards } from '@nestjs/common';
import { RoleGuard } from './role.guard';
import { Roles } from './role.decorator';
import { Role } from './role.enums';

@Controller('users')
@UseGuards(RoleGuard) // Apply guard to all routes in this controller
export class UserController {

  // PUBLIC ROUTE - No role required
  @Get('public')
  getPublicData() {
    return { message: 'This is public data' };
  }

  // ADMIN ONLY ROUTE
  @Post('admin-only')
  @Roles(Role.Admin) // Only admin can access
  adminAction() {
    return { message: 'Admin action performed' };
  }

  // ADMIN OR USER ROUTE
  @Get('profile')
  @Roles(Role.Admin, Role.User) // Both admin and user can access
  getProfile() {
    return { message: 'User profile data' };
  }

  // ADMIN ONLY DELETE
  @Delete('user/:id')
  @Roles(Role.Admin) // Only admin can delete
  deleteUser() {
    return { message: 'User deleted by admin' };
  }
}

// ============================================
// HOW TO TEST WITH CURL
// ============================================
// Test Admin Access:
// curl -H "x-user-role: admin" http://localhost:3000/users/admin-only

// Test User Access (Should be denied for admin-only route):
// curl -H "x-user-role: user" http://localhost:3000/users/admin-only

// Test Both Roles:
// curl -H "x-user-role: admin" http://localhost:3000/users/profile
// curl -H "x-user-role: user" http://localhost:3000/users/profile

// Test Without Role (Should be denied for protected routes):
// curl http://localhost:3000/users/profile

// ============================================
// EXTRA: ADVANCED USAGE WITH JWT
// ============================================
// If you're using JWT authentication, modify the guard:

/*
// In role.guard.ts - Get user from JWT payload:
const request = context.switchToHttp().getRequest();
const user = request.user; // Assumes JWT middleware added user object
const userRole = user?.role; // Extract role from JWT payload

if (!userRole || !requiredRoles.includes(userRole)) {
    return false;
}
return true;
*/

// ============================================
// APP MODULE SETUP
// ============================================
/*
// In app.module.ts:
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './role.guard';

@Module({
    providers: [
        {
            provide: APP_GUARD,
            useClass: RoleGuard, // Apply globally
        },
    ],
})
export class AppModule {}
*/