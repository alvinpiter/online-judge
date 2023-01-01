import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeORMPaginatedQueryBuilderAdapter } from '../pagination/adapters/TypeORMPaginatedQueryBuilderAdapter';
import { OffsetPaginationService } from '../pagination/offset-pagination.service';
import { ProblemsFilterParameter } from './interfaces';
import { Problem } from './problem.entity';

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 2;

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemsRepository: Repository<Problem>,
    private readonly offsetPaginationService: OffsetPaginationService,
  ) {}

  async getProblems(
    filter: ProblemsFilterParameter,
    offset?: number,
    limit?: number,
  ) {
    const qb = this.problemsRepository.createQueryBuilder('problems').select();

    if (filter.state) {
      qb.andWhere('problems.state = :problemState', {
        problemState: filter.state,
      });
    }

    const paginationResult =
      await this.offsetPaginationService.paginate<Problem>(
        new TypeORMPaginatedQueryBuilderAdapter(qb),
        {
          offset: offset || DEFAULT_OFFSET,
          limit: limit || DEFAULT_LIMIT,
        },
      );

    return {
      problems: paginationResult.result,
      meta: paginationResult.meta,
    };
  }

  async constructGetProblemsQueryBuilder(filter: ProblemsFilterParameter) {
    const qb = this.problemsRepository.createQueryBuilder('problems').select();

    if (filter.state) {
      qb.andWhere('problems.state = :problemState', {
        problemState: filter.state,
      });
    }

    return new TypeORMPaginatedQueryBuilderAdapter(qb);
  }

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
