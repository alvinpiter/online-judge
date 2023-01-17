import { ProblemTestCase } from 'src/modules/problems/entities/problem-test-case.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubmissionVerdict } from './submission.entity';

@Entity('submission_run_details')
export class SubmissionRunDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  submissionId: number;

  @Column()
  testCaseId: number;

  @ManyToOne(() => ProblemTestCase)
  @JoinColumn({ name: 'testCaseId' })
  testCase: ProblemTestCase;

  @Column()
  output: string;

  @Column()
  runTimeInMilliseconds: number;

  @Column()
  memoryUsageInKiloBytes: number;

  @Column()
  verdict: SubmissionVerdict;
}

export type SubmissionRunDetailWithoutId = Omit<SubmissionRunDetail, 'id'>;
