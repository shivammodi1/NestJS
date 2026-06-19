# Pipes
1. Pipes are used to transform and validate incoming request data.
2. NestJS allow you to create your own Custom Pipes, but it also provides some built-in pipes for common use cases.
3. They can be used for custom validation data transformation, or business logic filtering.
4. Pipes runs before the route handler, so they can modify the incoming request data before it reaches the controller.
5. We can apply pipes at different levels: method level, controller level, or globally.

## Built-in Pipes
1. `ValidationPipe`: Validates incoming request data against defined DTOs using class-validator decorators
2. `ParseIntPipe`: Transforms a string parameter to an integer.
3. `ParseBoolPipe`: Transforms a string parameter to a boolean.
4. `ParseArrayPipe`: Transforms a string parameter to an array.
5. `ParseEnumPipe`: Transforms a string parameter to a specific enum value.
etc.

## Custom Pipes
1. You can create your own custom pipes by implementing the `PipeTransform` interface.
2. Custom pipes can be used for specific validation or transformation logic that is not covered by built-in pipes.
3. Example of a custom pipe that transforms a string to uppercase:
```typescript
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
@Injectable()
export class UpperCasePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (typeof value === 'string') {
        return value.toUpperCase();
        }
        return value;
    }
    }
    ```
4. You can apply this custom pipe to a route handler like this:
```typescript
@Post()
create(@Body(new UpperCasePipe()) createCustomerDto: CreateCustomerDto) {
    // createCustomerDto.name will be transformed to uppercase
    return this.customersService.create(createCustomerDto);
}
```

## command to create a custom pipe
```bash
nest g pipe common/pipes/upper-case
```

## Difference between DTO and Pipe

| DTO                                                  | Pipe                                                  |
| ---------------------------------------------------- | ----------------------------------------------------- |
| Data ka structure define karta hai                   | Data ko transform ya validate karta hai               |
| Class hoti hai                                       | Class hoti hai jo `PipeTransform` implement karti hai |
| Request body ka shape batata hai                     | Request ke data par operation karta hai               |
| `name`, `email`, `age` jaisi fields define karta hai | Uppercase, ParseInt, Validation jaise kaam karta hai  |
