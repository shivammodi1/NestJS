import { SetMetadata } from '@nestjs/common';

// Ye ek custom key hai jo NestJS ke metadata system me roles store karega
export const ROLES_KEY = 'roles';

// Ye custom decorator hai: @Roles()
// Iska kaam hai route ke upar roles set karna (like admin, user, manager)

// (...roles: string[]) ka matlab hai hum multiple roles pass kar sakte hain
// Example: @Roles('admin', 'manager')

// SetMetadata NestJS ka feature hai jo data ko "hidden metadata" me store karta hai
// Ye directly yahan use nahi hota, but Guard isko read karega

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);