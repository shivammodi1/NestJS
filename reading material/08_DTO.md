# DTO (Data Transfer Object)
1. An objects that carries data between layers (like from client to backend).
2. Used to define the shape of incoming request data.
3. Ensures only required data is passed (security and validation).

## Why TS not apply strict validation on DTOs?
- TypeScript is a compile-time tool, it checks types at compile time, not at runtime.
- At runtime, the data can be anything (like from a client request), so TypeScript cannot enforce strict validation on DTOs.

## How to validate DTOs in NestJS?
- Use `class-validator` and `class-transformer` packages.
#### class-validator: Provides decorators to validate class properties.
#### class-transformer: Transforms plain objects into class instances and vice versa.

- Use decorators like `@IsString()`, `@IsInt()`, `@IsOptional()`, etc. to validate DTO properties.
- Use `@Body()` decorator in controller to bind and validate incoming request data against the DTO.
- Example:
```typescript
import { IsString, IsInt, IsOptional } from 'class-validator';
export class CreateCustomerDto {
    @IsString()
    // @IsOptional() // if the property is optional
    // @IsNotEmpty() // if the property is required and should not be empty
    name: string;

    @IsInt()
    age: number;
}
```
- Use `ValidationPipe` in the main.ts file to enable validation for incoming requests.
```typescript
import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove properties that do not define in the DTO
    forbidNonWhitelisted: true, // throw an error if any non-whitelisted properties are present
  })); // enable validation for incoming requests

```


# Interface
- Interfaces define the structure (type) of an object.
- Helps write clean, structured, type-safe code.
- Used for both request (DTO) and response objects.

