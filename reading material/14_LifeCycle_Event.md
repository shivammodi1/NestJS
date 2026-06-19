# Life Cycle Events:

1. Special method / hooks provided by NestJS.
2. Automatically called at different stages of the modules/services/conponents lifecycle.
3. Used to perform actions during creation or destruction of modules/services/components.

## Why they are useFul?
- Helps run some code when appp/module/service is initialized .
- Helps run cleanup code when appp/module/service is destroyed.
- Useful for taks like DB connections, logging, resource cleanup, etc.

## When they will trigger?
- `onModuleInit`: Called once the module is initialized.
- `onModuleDestroy`: Called before the module is destroyed.
- `onApplicationBootstrap`: Called once the application has fully started.
- `onApplicationShutdown`: Called before the application shuts down.
- `beforeApplicationShutdown`: Called before the application starts shutting down (can be used for async cleanup).

## Eaxmple code in database folder
- databse.service.ts
- database.controller.ts
After wirting logic in main.ts file regarding shutdown hooks, we can test the lifecycle events by running the application and then stopping it (e.g., using Ctrl+C in the terminal). The `onApplicationShutdown` and `beforeApplicationShutdown` methods will be triggered, allowing us to see the cleanup logic in action.