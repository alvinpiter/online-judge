import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  hashedPassword: string;

  @Column()
  role: UserRole;

  isCorrectHashedPassword(hashedPassword: string) {
    return this.hashedPassword === hashedPassword;
  }
}
