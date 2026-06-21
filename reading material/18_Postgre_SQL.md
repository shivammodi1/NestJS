# PostgreSQL Overview
• PostgreSQL is a powerful, open-source relational database system.
• It stores data in rows and tables using SQL (Structured Query
Language).
• It's known for stability, performance, and data integrity.

# Why Use PostgreSQL?
• Open-source and free to use.
• Supports advanced data types and performance optimization.
• ACID compliance ensures reliable transactions.
• Extensible with custom functions, data types, and operators.  
• Widely used in startups to enterprise-level applications.
• Supports JSON and XML data types for modern applications.

# Key Features
• Multi-Version Concurrency Control (MVCC) for high performance.
• Full-text search capabilities.
• Support for foreign keys, joins, views, triggers, and stored procedures.
• Advanced indexing techniques (B-tree, Hash, GiST, SP-GiST, GIN, BRIN).
• Replication and high availability features.
• It supports SQL as well as NoSQL features.


# TypeORM in PostgreSQL

## 🔷 TypeORM kya hai?
TypeORM ek **ORM (Object-Relational Mapping)** library hai jo TypeScript aur JavaScript applications me use hoti hai.

👉 ORM ka matlab:
Database tables ko directly SQL se handle karne ke bajay, hum **TypeScript classes aur objects** ke through database ko manage karte hain.

---

## 🔷 PostgreSQL ke saath kaise kaam karta hai?

PostgreSQL ek **relational database** hai jisme data tables, rows aur columns me store hota hai.

TypeORM is database ko TypeScript objects se map karta hai.

### 🔁 Mapping Example

### 🧑‍💻 TypeScript Entity
```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```

### 🗄️ PostgreSQL Table
```sql
CREATE TABLE user (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
```

### 🔍 Querying with TypeORM
```ts
import { getRepository } from "typeorm";
const userRepository = getRepository(User);
const user = await userRepository.findOne({ name: "John" });
console.log(user);
```

## 🔷 TypeORM ke Benefits
1. **Type Safety**: TypeScript ke saath use karne par type safety milti hai.
2. **Database Abstraction**: SQL queries likhne ki zarurat nahi, TypeORM aapke liye handle karta hai.
3. **Cross-Database Compatibility**: TypeORM multiple databases (MySQL, SQLite, etc.) ke saath kaam karta hai.
4. **Migrations**: Database schema changes ko easily manage karne ke liye migrations support karta hai.
5. **Active Record and Data Mapper Patterns**: Dono design patterns ko support karta hai
6. **Community Support**: TypeORM ka ek active community hai jo regular updates aur bug fixes provide karti hai.

