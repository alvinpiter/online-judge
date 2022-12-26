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
}
