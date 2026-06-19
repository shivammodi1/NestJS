# Environment Variables in NestJS
- It is basically a way to store sensitive information like database credentials, API keys, and other configuration settings outside of the source code.
- This allows for better security, easier configuration management, and the ability to change settings without modifying the codebase.

## How to use Environment Variables in NestJS?
1. Install the `@nestjs/config` package using npm:
```
npm i @nestjs/config
```
2. isse install karne ke baad, aapko `ConfigModule` ko apne root module (app.module.ts) me import karna hoga. Ye module environment variables ko load karega aur unhe application ke andar accessible banayega.

```typescript
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // global banane ke liye, taki har module me import na karna pade
    }),
  ],
})
export class AppModule {}
```

3. Ab aap environment variables ko `.env` file me define kar sakte hain. Ye file project ke root directory me honi chahiye. Example:
```
DB_URL=mongodb://localhost:27017/mydatabase
JWT_SECRET=mysecretkey
```

4. Ab aap `ConfigService` ko inject karke environment variables ko access kar sakte hain. Example:
```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EvService {
  constructor(private configService: ConfigService) {}  

    getDatabaseUrl(): string {
        return this.configService.get<string>('DB_URL');
    }

    getJwtSecret(): string {
        return this.configService.get<string>('JWT_SECRET');
    }
}
```

## Why we use configService?
- It provides a convenient way to access environment variables and configuration settings in a type-safe manner.
- It allows for better organization and management of configuration settings, especially in larger applications.
- It is a built-in feature of NestJS, making it easy to integrate and use without relying on external libraries.
