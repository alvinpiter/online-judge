import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

const zero = 0;

@Entity('user_problem_attempts')
export class UserProblemAttempt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  problemId: number;

  @Column()
  numberOfAttempts: number = zero;

  @Column({ type: 'datetime', nullable: true })
  firstSolvedAt: Date = null;
}
