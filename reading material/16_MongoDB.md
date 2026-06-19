# NestJS With MongoDB:
- NoSQL database, document-oriented, flexible schema, high performance, scalability, and ease of use.
- Use Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js
- It does not require tables or fixed schemas, and it allows for easy horizontal scaling.
- Used for fast and scalable applications, real-time analytics, content management systems, and more.

- Install Mongoose:
```bash
 npm i @nestjs/mongoose mongoose
```

- Than install nest/config package to manage environment variables:
```bash
 npm i @nestjs/config
```

- Than register the ConfigModule in the AppModule:
```typescript
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule available globally
    }),
    // moongoose module and other modules
    moongooseModule.forRoot(process.env.MONGODB_URI), // Use environment variable for MongoDB connection string
  ],
  // controllers and providers
})
export class AppModule {}
```

