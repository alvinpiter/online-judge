import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
