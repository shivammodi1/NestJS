# Services

1. A TypeScript class with business logic like
calculations, data access, etc.
2. Used to write business logic in a clean and
reusable way.
3. They are marked with @Injectable() so
NestJS can use them.

# Why We Need Services?
1. To separate business logic from controllers.
2. To make the code more modular and easier to test.
3. To promote code reusability across different parts of the application.
4. Helps keep your app organized and scalable.

# Important Notes:
1. Always use @Injectable() decorator on services.
2. Inject services into controllers using constructor injection.
3. Services are part of the Dependency Injection System.
4. Logic like fetching Data, calulations, or API calls goes inside services.

# Generate a Service:
```bash
nest generate service users
           OR
nest g s users
```