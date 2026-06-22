import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;
}

// PrimaryGeneratedColumn -> 
// yeh decorator hai jo ki primary key ko generate karta hai automatically.
// Iska use tab hota hai jab aap chahte hain ki database automatically unique identifier generate kare har record ke liye.