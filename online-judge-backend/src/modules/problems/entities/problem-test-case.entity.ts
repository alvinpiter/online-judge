import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('problem_test_cases')
export class ProblemTestCase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  problemId: number;

  @Column()
  inputFileName: string;

  @Column()
  inputFileKey: string;

  @Column()
  outputFileName: string;

  @Column()
  outputFileKey: string;
}
