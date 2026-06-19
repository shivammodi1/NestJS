# NestJS Exception Filters - Complete Notes

## What is an Exception Filter?

Exception Filters in NestJS are used to handle errors and exceptions in a centralized manner. Instead of writing error-handling logic repeatedly in multiple controllers or services, we can create a single filter that catches exceptions and formats the response consistently.

Exception Filters help in:

* Centralized error handling
* Consistent error responses
* Cleaner controller and service code
* Logging and monitoring errors
* Customizing error messages sent to clients

NestJS provides built-in exception handling, but custom exception filters allow us to control exactly how errors are returned to the client.

---

## Exception Filter Lifecycle

1. An exception is thrown in a controller, service, pipe, guard, or interceptor.
2. NestJS catches the exception.
3. The Exception Filter processes the exception.
4. A customized response is sent back to the client.

---

## Creating an Exception Filter

Generate a filter using Nest CLI:

```bash
nest g filter http-exception
```

This creates a filter file where custom error-handling logic can be implemented.

---

## Complete Exception Filter Code

```typescript
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

---

## Understanding Every Part

### 1. @Catch() Decorator

```typescript
@Catch()
```

The `@Catch()` decorator tells NestJS that this class is an exception filter.

Without specifying any exception type:

```typescript
@Catch()
```

the filter can catch all exceptions.

If we want to catch only a specific exception:

```typescript
@Catch(HttpException)
```

then only `HttpException` errors will be handled by this filter.

---

### 2. Implementing ExceptionFilter

```typescript
export class HttpExceptionFilter<T> implements ExceptionFilter
```

The filter class implements the `ExceptionFilter` interface.

This interface forces us to implement the `catch()` method.

---

### 3. catch() Method

```typescript
catch(exception: HttpException, host: ArgumentsHost)
```

Whenever an exception occurs, NestJS automatically calls this method.

Parameters:

* `exception` → the actual error object
* `host` → provides access to request, response, and execution context

---

### 4. ArgumentsHost

```typescript
const ctx = host.switchToHttp();
```

`ArgumentsHost` is a wrapper around the execution context.

NestJS applications can run on:

* HTTP
* WebSockets
* Microservices

Since we are working with HTTP requests, we switch to HTTP context.

```typescript
host.switchToHttp();
```

This gives access to:

* Request object
* Response object

---

### 5. Getting Response Object

```typescript
const response = ctx.getResponse<Response>();
```

This retrieves the Express response object.

It is used to send a custom response back to the client.

Example:

```typescript
response.status(400).json({...});
```

---

### 6. Getting Request Object

```typescript
const request = ctx.getRequest<Request>();
```

This retrieves the Express request object.

Using this object we can access:

```typescript
request.url
request.body
request.params
request.headers
request.method
```

In the filter we use:

```typescript
request.url
```

to return the route that caused the error.

---

### 7. Getting Status Code

```typescript
const status = exception.getStatus();
```

`HttpException` provides a method called `getStatus()`.

Examples:

```typescript
BadRequestException -> 400
UnauthorizedException -> 401
ForbiddenException -> 403
NotFoundException -> 404
InternalServerErrorException -> 500
```

The filter extracts the correct HTTP status code from the exception.

---

### 8. Sending Custom JSON Response

```typescript
response.status(status).json({
  statusCode: status,
  timestamp: new Date().toISOString(),
  path: request.url,
});
```

Instead of NestJS's default error response, we send our own custom response.

Example output:

```json
{
  "statusCode": 400,
  "timestamp": "2026-06-17T18:35:22.534Z",
  "path": "/exception/hello/abc"
}
```

---

## Using the Filter

Controller:

```typescript
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../filters/http-exception/http-exception.filter';

@Controller('exception')
@UseFilters(HttpExceptionFilter)
export class ExceptionController {

  @Get('hello/:id')
  getHello(@Param('id', ParseIntPipe) id: number) {
    return {
      message: `hello ${id}`,
    };
  }
}
```

---

## What is @UseFilters()?

```typescript
@UseFilters(HttpExceptionFilter)
```

This decorator tells NestJS to use the specified exception filter.

It can be applied at:

### Method Level

```typescript
@Get()
@UseFilters(HttpExceptionFilter)
```

Only that route uses the filter.

---

### Controller Level

```typescript
@Controller()
@UseFilters(HttpExceptionFilter)
```

All routes inside the controller use the filter.

---

### Global Level

In `main.ts`:

```typescript
app.useGlobalFilters(new HttpExceptionFilter());
```

Now every controller and every route uses the filter.

---

## Why ParseIntPipe is Used?

Route:

```typescript
@Get('hello/:id')
```

All route parameters are received as strings.

Example:

```http
GET /hello/10
```

The value of `id` is:

```typescript
"10"
```

which is a string.

---

### Without ParseIntPipe

```typescript
@Param('id') id: number
```

Even though TypeScript says `number`, the runtime value is still:

```typescript
"10"
```

TypeScript types disappear after compilation.

---

### With ParseIntPipe

```typescript
@Param('id', ParseIntPipe) id: number
```

NestJS automatically converts:

```typescript
"10"
```

to:

```typescript
10
```

which is a real number.

---

### Valid Request

```http
GET /exception/hello/10
```

Response:

```json
{
  "message": "hello 10"
}
```

---

### Invalid Request

```http
GET /exception/hello/abc
```

Since `"abc"` cannot be converted into a number, `ParseIntPipe` throws an exception.

NestJS throws:

```typescript
BadRequestException
```

with status:

```typescript
400
```

The Exception Filter catches it and returns:

```json
{
  "statusCode": 400,
  "timestamp": "2026-06-17T18:35:22.534Z",
  "path": "/exception/hello/abc"
}
```

---

## Flow of Execution

```text
Client Request
       │
       ▼
Controller Route
       │
       ▼
ParseIntPipe Executes
       │
 ┌─────┴─────┐
 │           │
Valid      Invalid
 │           │
 ▼           ▼
Controller  Exception Thrown
Executes         │
 │               ▼
 ▼       Exception Filter
Response          │
                  ▼
          Custom Error Response
```

---

## Key Points to Remember

* Exception Filters provide centralized error handling.
* `@Catch()` marks a class as an exception filter.
* `ExceptionFilter` interface requires a `catch()` method.
* `ArgumentsHost` gives access to request and response objects.
* `switchToHttp()` is used when handling HTTP requests.
* `getRequest()` retrieves the request object.
* `getResponse()` retrieves the response object.
* `getStatus()` retrieves the HTTP status code.
* `response.status().json()` sends a custom error response.
* `@UseFilters()` applies exception filters.
* Filters can be applied globally, controller-wide, or route-specific.
* `ParseIntPipe` converts string route parameters into numbers.
* If conversion fails, `ParseIntPipe` throws `BadRequestException`.
* The Exception Filter catches the exception and returns a customized response.
