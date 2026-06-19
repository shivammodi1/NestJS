import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  // This method decides whether request is allowed or not
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // Get the incoming HTTP request object
    const request = context.switchToHttp().getRequest();

    // Extract Authorization header from request
    // Example: "shivam secret"
    const authHeader = request.headers['authorization'];

    // If no authorization header is present, deny access
    if (!authHeader) {
      return false;
    }

    // Check if the token matches expected value
    // (This is a simple demo check, not production-ready auth)
    return authHeader === 'shivam secret';
  }
}