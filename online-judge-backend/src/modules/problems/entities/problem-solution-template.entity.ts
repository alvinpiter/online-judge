import { ProgrammingLanguage } from 'src/constants/programming-languages';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
