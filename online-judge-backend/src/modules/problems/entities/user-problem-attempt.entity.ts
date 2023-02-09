import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Problem } from './problem.entity';

const zero = 0;

export enum UserProblemAttemptType {
  SOLVED = 'SOLVED',
  ATTEMPTED = 'ATTEMPTED',
  NOT_ATTEMPTED = 'NOT_ATTEMPTED',
}

@Entity('user_problem_attempts')
export class UserProblemAttempt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  problemId: number;

  @ManyToOne(() => Problem)
  @JoinColumn({ name: 'problemId' })
  problem: Problem;

  @Column()
  numberOfAttempts: number = zero;

  @Column({ type: 'datetime', nullable: true })
  firstSolvedAt: Date = null;

  getAttemptType() {
    if (this.firstSolvedAt !== null) {
      return UserProblemAttemptType.SOLVED;
    } else {
      if (this.numberOfAttempts === 0) {
        return UserProblemAttemptType.NOT_ATTEMPTED;
      } else {
        return UserProblemAttemptType.ATTEMPTED;
      }
    }
  }

  alreadySolved() {
    return this.firstSolvedAt !== null;
  }
}
