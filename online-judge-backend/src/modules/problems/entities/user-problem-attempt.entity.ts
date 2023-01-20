import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  numberOfAttempts: number = zero;

  @Column({ type: 'datetime', nullable: true })
  firstSolvedAt: Date = null;

  getAttemptType() {
    if (this.firstSolvedAt !== null) {
      return UserProblemAttemptType.SOLVED;
    } else {
      return UserProblemAttemptType.ATTEMPTED;
    }
  }
}
