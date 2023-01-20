import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Problem } from './problem.entity';

@Entity('problem_statistics')
export class ProblemStatistics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  problemId: number;

  @OneToOne(() => Problem, (problem) => problem.problemStatistics)
  @JoinColumn({ name: 'problemId' })
  problem: Problem;

  @Column()
  solverCount: number;
}
