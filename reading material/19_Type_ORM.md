# NestJS + TypeORM + PostgreSQL (Step-by-Step Notes)

## 1. Required Packages Install Karo

```bash
npm install @nestjs/typeorm typeorm pg
```

### Package Explanation

#### `@nestjs/typeorm`

NestJS aur TypeORM ko integrate karne ke liye use hota hai.

#### `typeorm`

ORM (Object Relational Mapping) library hai jo TypeScript classes ko database tables ke saath map karti hai.

#### `pg`

PostgreSQL driver hai jo Node.js application ko PostgreSQL database se connect karne deta hai.

---

# 2. TypeORM Configuration

```ts
imports: [
  ConfigModule.forRoot(),

  TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DB_URL,
    autoLoadEntities: true,
    synchronize: true,
  }),

  UserModule,
]
```

---

## `type: 'postgres'`

Batata hai ki hum PostgreSQL database use kar rahe hain.

```ts
type: 'postgres'
```

---

## `url: process.env.DB_URL`

Database connection string environment variable se aati hai.

Example:

```env
DB_URL=postgresql://postgres:password@localhost:5432/mydb
```

---

## `autoLoadEntities: true`

Automatically sabhi entities load kar leta hai.

Agar project me multiple entities hain:

```ts
User
Product
Order
Category
```

To manually register karne ki zarurat nahi hoti.

```ts
entities: [User, Product, Order]
```

likhne ki zarurat nahi padegi.

---

## `synchronize: true`

Entity ke according database tables automatically create/update karta hai.

```text
Entity
  ↓
TypeORM
  ↓
Database Table
```

Example:

Entity me naya column add kiya:

```ts
@Column()
email: string;
```

Application restart karoge →

Database table me bhi `email` column create ho jayega.

### Development

```ts
synchronize: true
```

Use kar sakte hain.

### Production

```ts
synchronize: false
```

Use karte hain aur migrations chalate hain.

---

# 3. Entity Kya Hoti Hai?

Entity database table ko represent karti hai.

Entity ek class hoti hai jo database table ka structure define karti hai.

Isme define karte hain:

* Columns
* Relationships
* Constraints
* Metadata

---

## Example Entity

```ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;
}
```

---

# 4. `@Entity()` Decorator

```ts
@Entity()
```

Batata hai ki ye class database table hai.

```ts
export class User
```

↓

Database me

```sql
users
```

table create hoga.

---

# 5. `@PrimaryGeneratedColumn()`

```ts
@PrimaryGeneratedColumn()
id!: number;
```

Primary key automatically generate karta hai.

Har record ko unique ID milti hai.

Example:

```sql
id | name
-----------
1  | Shivam
2  | Rahul
3  | Aman
```

ID automatically generate ho rahi hai.

---

# 6. `@Column()`

```ts
@Column()
name!: string;
```

Database table me ek column create karta hai.

Example:

```ts
@Column()
name!: string;

@Column()
email!: string;
```

Database:

```sql
users
-------------------
id
name
email
```

---

# 7. Entity Se Table Kaise Banta Hai?

Entity:

```ts
@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;
}
```

Database Table:

```sql
users
-------------------
id
name
email
```

---

# 8. User Module

```ts
import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
```

---

# 9. `TypeOrmModule.forFeature([User])`

```ts
TypeOrmModule.forFeature([User])
```

User Entity ke liye repository provide karta hai.

Iske baad service me repository inject kar sakte hain.

Example:

```ts
constructor(
  @InjectRepository(User)
  private userRepository: Repository<User>,
) {}
```

Ab repository ke through CRUD operations kar sakte hain.

---

# 10. Complete Flow

```text
User Entity
    ↓
TypeOrmModule.forFeature([User])
    ↓
Repository Create
    ↓
Service
    ↓
Controller
    ↓
API Request
    ↓
PostgreSQL Database
```

---

# Quick Revision

## Entity

```ts
@Entity()
```

Database table create karti hai.

---

## PrimaryGeneratedColumn

```ts
@PrimaryGeneratedColumn()
```

Auto-increment primary key create karta hai.

---

## Column

```ts
@Column()
```

Database column create karta hai.

---

## autoLoadEntities

```ts
autoLoadEntities: true
```

Sab entities automatically load karo.

---

## synchronize

```ts
synchronize: true
```

Entity ke according database tables automatically create/update karo.

---

## forFeature

```ts
TypeOrmModule.forFeature([User])
```

Entity ki repository provide karta hai taaki service database operations perform kar sake.
