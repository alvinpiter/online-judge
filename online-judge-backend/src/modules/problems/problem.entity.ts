import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ProblemState {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
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
}
