# Middleware - Short Notes

## What is Middleware?
Middleware → "Who is the user?"
Guard → "Can this user access this route?"

Middleware is a function that runs between the incoming request and the controller response.

Flow:

```text
Request → Middleware → Controller → Response
```

## Uses of Middleware

* Logging requests
* Authentication
* Request validation
* Error handling
* Response formatting
* Blocking specific IPs
* Modifying request data

## Generate Middleware

```bash
nest g middleware logger
```

## Basic Middleware Example

```typescript
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.method, req.url);
    next();
  }
}
```

## After creating middleware, register it in the module:

```typescript
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
        .forRoutes('users'); // Apply to /users route
    }
}
```



## Important Points

* Runs before Guards and Controllers.
* Has access to `req`, `res`, and `next`.
* Must call `next()` to continue execution.
* Registered inside a module using `MiddlewareConsumer`.


# Middleware vs Guard - Short Notes

| Middleware                  | Guard                      |
| --------------------------- | -------------------------- |
| Runs first                  | Runs after Middleware      |
| Used for request processing | Used for authorization     |
| Access to req, res, next    | Access to ExecutionContext |
| Best for logging            | Best for route protection  |
| Can modify requests         | Cannot modify requests     |
| No route metadata access    | Can access route metadata  |

## Use Middleware When

* Logging requests
* Modifying request data
* IP blocking
* Validation before controller

## Use Guard When

* JWT authentication
* Role-based access control (RBAC)
* Permission checks
* Protecting routes

## Execution Order

```text
Request
   ↓
Middleware
   ↓
Guard
   ↓
Pipe
   ↓
Controller
   ↓
Response
```

## Easy Trick

**Middleware:** "What is this request?"

**Guard:** "Should this request be allowed?"
