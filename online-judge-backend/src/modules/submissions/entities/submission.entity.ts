import { ProgrammingLanguage } from 'src/constants/programming-languages';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum SubmissionVerdict {
  COMPILE_ERROR = 'COMPILE_ERROR',
  RUN_TIME_ERROR = 'RUN_TIME_ERROR',
  WRONG_ANSWER = 'WRONG_ANSWER',
  TIME_LIMIT_EXCEEDED = 'TIME_LIMIT_EXCEEDED',
  ACCEPTED = 'ACCEPTED',
}

@Entity('submissions')
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  problemId: number;

  @Column()
  userId: number;

  @Column()
  programmingLanguage: ProgrammingLanguage;

  @Column()
  code: string;

  @Column({ type: 'datetime' })
  submittedAt = new Date();

  @Column()
  verdict: SubmissionVerdict;
}
