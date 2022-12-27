import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProgrammingLanguage } from '../general/constants';

@Entity('problem_solution_templates')
export class ProblemSolutionTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  problemId: number;

  @Column()
  programmingLanguage: ProgrammingLanguage;

  @Column()
  template: string;
}
