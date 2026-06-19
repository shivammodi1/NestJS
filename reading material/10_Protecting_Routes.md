# Protecting Routes
- It means restrcting access to specific API routes.
- Only authenticated users (like logged-in users / admins) can access those routes.

# Guards :
- Guards are classes that implement the logic to decide whether a request should be allowed or denied.
- They implement the `CanActivate` interface and have a `canActivate()` method that returns a boolean or a Promise/Observable of a boolean.
- CanActivate method is called before the route is activated.
- Mostly used for authentication and authorization.

## Why use Guards?
1. To protect routes from unauthorized access.
2. To implement role-based access control (RBAC).
3. To ensure that only authenticated users can access certain routes.
4. To avoid duplicating checks in multiple controllers or services.

## Example of a Guard:
```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (authHeader && authHeader === 'Bearer mysecrettoken') {
            return true; // Allow access
        }
        return false; // Deny access
    }

}
```
- In this example, the `AuthGuard` checks for an `Authorization` header with a specific token. If the token matches, it allows access; otherwise, it denies access.

## Applying Guards to Routes:

- You can apply guards at the controller level or at the route handler level.
```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
@Controller('product')
@UseGuards(AuthGuard) // Apply guard to all routes in this controller
export class ProductController {
    @Get()
    getAllProducts() {
        return 'This route is protected by AuthGuard';
    }
}
```


- In this example, the `AuthGuard` is applied to the entire `ProductController`, meaning all routes within this controller will be protected. You can also apply guards to specific route handlers if needed.
```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';   
@Controller('product')
export class ProductController {
    @Get()
    @UseGuards(AuthGuard) // Apply guard to this specific route
    getAllProducts() {
        return 'This route is protected by AuthGuard';
    }
}
```
