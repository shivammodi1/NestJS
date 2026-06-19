# Controllers in NestJS

## What is a Controller?

- Controllers incoming HTTP requests ko handle karte hain.
- Ye application ke routes define karte hain.
- Client aur Service (business logic) ke beech bridge ka kaam karte hain.
- API endpoints ko organize aur manage karte hain.
- Routing aur business logic ko alag rakhne me help karte hain.
- Code ko scalable aur maintainable banate hain.
- Project ki readability improve karte hain.

## Command to Create Controller

```bash
nest generate controller <controller-name>
```
- it will create folder with controller file, spec file and module file.
- and also update app.module.ts file with new controller.



### Common HTTP Methods

- `GET` → Data fetch karne ke liye
- `POST` → Naya data create karne ke liye
- `PUT` → Existing data update karne ke liye
- `DELETE` → Data delete karne ke liye

### Request Flow

User Request  
↓  
Controller  
↓  
Service (Business Logic)  
↓  
Response  
↓  
User

### Simple Example

```typescript
@Controller('users')
export class UserController {

  @Get()
  getUsers() {
    return "All Users";
  }

}
```

- `users` route par request aayegi.
- Controller request handle karega.
- Response return karega.

---

# Decorators in NestJS

## What are Decorators?

- Decorators special functions hote hain jo classes, methods, properties ya parameters par metadata add karte hain.
- Ye hamesha `@` symbol se start hote hain.
- NestJS ko batate hain ki class ya method ka behavior kya hoga.
- Routing, Dependency Injection, Validation, Guards, etc. me use hote hain.

## Important Decorators
1. @Param() → URL parameter (:id)
2. @Body() → Request body
3. @Query() → Query parameters (?name=value)
4. @Headers() → Request headers
5. @Req() → Request object
6. @Res() → Response object

### Simple Definition

> Decorators NestJS ko instructions dete hain ki kisi class ya method ko kaise handle karna hai.

---

## Common Decorators

### 1. @Controller()

- Kisi class ko Controller banata hai.
- Base route define karta hai.

```typescript
@Controller('users')
```

**Meaning:** `/users` route handle karega.

---

### 2. @Get()

- GET request handle karta hai.

```typescript
@Get()
```

**Example:**

```typescript
@Get()
getUsers() {
  return "All Users";
}
```

---

### 3. @Post()

- POST request handle karta hai.

```typescript
@Post()
createUser() {
  return "User Created";
}
```

---

### 4. @Put()

- Existing data update karne ke liye use hota hai.

```typescript
@Put()
updateUser() {
  return "User Updated";
}
```

---

### 5. @Delete()

- Data delete karne ke liye use hota hai.

```typescript
@Delete()
deleteUser() {
  return "User Deleted";
}
```

---

## Why Decorators?

- Code ko clean banate hain.
- Routing easy ho jati hai.
- NestJS framework ko instructions mil jati hain.
- Readability improve hoti hai.
- Development fast ho jata hai.

### Easy Yaad Rakhne Ka Tarika

- **Controller** → Request receive karta hai 📥
- **Service** → Actual kaam karta hai ⚙️
- **Decorator** → NestJS ko instruction deta hai 📢

### Exam Line

> Controllers incoming HTTP requests ko handle karte hain aur services ke saath communicate karke response return karte hain. Decorators special functions hote hain jo `@` symbol se start hote hain aur NestJS ko class ya method ke behavior ke baare me metadata provide karte hain.