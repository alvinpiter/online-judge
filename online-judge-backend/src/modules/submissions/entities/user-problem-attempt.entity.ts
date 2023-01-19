import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_problem_attempts')
export class UserProblemAttempt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  problemId: number;

  @Column()
  numberOfAttempts: number;

  @Column({ type: 'datetime', nullable: true })
  firstSolvedAt: Date;
}
