import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

// Reflector NestJS ka helper hai
// Iska kaam hota hai metadata read karna (jo @Roles decorator ne set kiya hai)
import { Reflector } from '@nestjs/core';

import { Observable } from 'rxjs';
import { ROLES_KEY } from './role.decorator';
import { Role } from './role.enums';

@Injectable()
export class RoleGuard implements CanActivate {

  // Reflector inject kar rahe hain taaki metadata read kar sake
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // @Roles() decorator se jo roles set hue hain unko read kar rahe hain
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [
        context.getHandler(), // current API method (GET, POST etc.)
        context.getClass(),   // controller level
      ],
    );

    // Agar koi role define nahi hai toh access allow kar do
    if (!requiredRoles) {
      return true;
    }

    // Request object le rahe hain (incoming HTTP request)
    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string>;
    }>();

    // Header se user role le rahe hain
    // Example: x-user-role: admin
    const userRole = request.headers['x-user-role'];

    // Check kar rahe hain ki user ka role allowed roles me hai ya nahi
    if (!requiredRoles.includes(userRole as Role)) {
      // Agar role match nahi hua toh access deny
      return false;
    }

    // Agar role match ho gaya toh access allow
    return true;
  }
}