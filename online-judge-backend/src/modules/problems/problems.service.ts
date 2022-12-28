import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Problem } from './problem.entity';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemsRepository: Repository<Problem>,
  ) {}

  async createProblem(name: string, description: string) {
    const problem = new Problem();
    problem.name = name;
    problem.description = description;

    return this.problemsRepository.save(problem);
  }

  async getProblem(problemId: number) {
    return this.problemsRepository.findOneBy({ id: problemId });
  }

  async updateProblem(problemId: number, name: string, description: string) {
    const problem = await this.problemsRepository.findOneBy({ id: problemId });
    problem.name = name;
    problem.description = description;

    return this.problemsRepository.save(problem);
  }
}
