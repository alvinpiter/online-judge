import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProblemStatistics } from './problem-statistics.entity';

export enum ProblemState {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export interface ProblemsFilterParameter {
  state?: ProblemState;
}

export enum ProblemsOrderOption {
  BY_ID_ASC = 'BY_ID_ASC',
  BY_ID_DESC = 'BY_ID_DESC',
  BY_RATING_ASC = 'BY_RATING_ASC',
  BY_RATING_DESC = 'BY_RATING_DESC',
  BY_SOLVER_COUNT_ASC = 'BY_SOLVER_COUNT_ASC',
  BY_SOLVER_COUNT_DESC = 'BY_SOLVER_COUNT_DESC',
}

@Entity('problems')
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  state: ProblemState = ProblemState.DRAFT;

  @Column({ default: 0 })
  rating: number;

  @OneToOne(
    () => ProblemStatistics,
    (problemStatistics) => problemStatistics.problem,
  )
  problemStatistics: ProblemStatistics;

  isPublished() {
    return this.state === ProblemState.PUBLISHED;
  }
}
