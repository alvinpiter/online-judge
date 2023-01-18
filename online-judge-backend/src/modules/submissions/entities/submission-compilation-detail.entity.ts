import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('submission_compilation_details')
export class SubmissionCompilationDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  submissionId: number;

  @Column()
  message: string;
}
