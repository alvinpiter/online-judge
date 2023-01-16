import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SubmissionVerdict } from './submission.entity';

@Entity('submission_run_details')
export class SubmissionRunDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  submissionId: number;

  @Column()
  testCaseId: number;

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
