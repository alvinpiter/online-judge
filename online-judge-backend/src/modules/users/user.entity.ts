import { compareSync } from 'bcrypt';
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

  isCorrectPassword(password: string) {
    return compareSync(password, this.hashedPassword);
  }
}
