import { ProgrammingLanguage } from 'src/constants/programming-languages';
import { Problem } from 'src/modules/problems/entities/problem.entity';
import { User } from 'src/modules/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum SubmissionVerdict {
  COMPILE_ERROR = 'COMPILE_ERROR',
  RUN_TIME_ERROR = 'RUN_TIME_ERROR',
  WRONG_ANSWER = 'WRONG_ANSWER',
  TIME_LIMIT_EXCEEDED = 'TIME_LIMIT_EXCEEDED',
  ACCEPTED = 'ACCEPTED',
}

export enum SubmissionsOrderOption {
  BY_ID_DESC = 'BY_ID_DESC',
}

@Entity('submissions')
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  problemId: number;

  @ManyToOne(() => Problem)
  @JoinColumn({ name: 'problemId' })
  problem: Problem;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  programmingLanguage: ProgrammingLanguage;

  @Column()
  code: string;

  @Column({ type: 'datetime' })
  submittedAt = new Date();

  @Column({ nullable: true })
  verdict: SubmissionVerdict | null;
}
