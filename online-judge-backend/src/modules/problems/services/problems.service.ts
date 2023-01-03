import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeORMPaginatedQueryBuilderAdapter } from '../../pagination/adapters/TypeORMPaginatedQueryBuilderAdapter';
import { OffsetPaginationService } from '../../pagination/offset-pagination.service';
import {
  Problem,
  ProblemsOrderOption,
  ProblemState,
} from '../entities/problem.entity';
import { ProblemCreationDto } from '../data-transfer-objects/problem-creation.dto';
import { ProblemUpdateDto } from '../data-transfer-objects/problem-update.dto';
import { ProblemsGetDto } from '../data-transfer-objects/problems-get.dto';

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemsRepository: Repository<Problem>,
    private readonly offsetPaginationService: OffsetPaginationService,
  ) {}

  async getProblems(problemsGetDto: ProblemsGetDto) {
    const qb = this.problemsRepository.createQueryBuilder('problems').select();

    if (problemsGetDto.state) {
      qb.andWhere('problems.state = :problemState', {
        problemState: problemsGetDto.state,
      });
    }

    switch (problemsGetDto.order) {
      case ProblemsOrderOption.BY_ID_DESC:
        qb.orderBy('id', 'DESC');
        break;
      case ProblemsOrderOption.BY_RATING_ASC:
        qb.orderBy('rating', 'ASC');
        break;
      case ProblemsOrderOption.BY_RATING_DESC:
        qb.orderBy('rating', 'DESC');
        break;
      default:
        qb.orderBy('id', 'ASC');
    }

    const paginationResult =
      await this.offsetPaginationService.paginate<Problem>(
        new TypeORMPaginatedQueryBuilderAdapter(qb),
        {
          offset: problemsGetDto.offset || DEFAULT_OFFSET,
          limit: problemsGetDto.limit || DEFAULT_LIMIT,
        },
      );

    return {
      problems: paginationResult.result,
      meta: paginationResult.meta,
    };
  }

  async createProblem(problemCreationDto: ProblemCreationDto) {
    const problem = new Problem();
    problem.name = problemCreationDto.name;
    problem.description = problemCreationDto.description;
    problem.rating = problemCreationDto.rating;

    return this.problemsRepository.save(problem);
  }

  async getProblem(problemId: number) {
    return this.problemsRepository.findOneByOrFail({ id: problemId });
  }

  async updateProblem(problemId: number, problemUpdateDto: ProblemUpdateDto) {
    const problem = await this.getProblem(problemId);
    problem.name = problemUpdateDto.name;
    problem.description = problemUpdateDto.description;
    problem.rating = problemUpdateDto.rating;

    return this.problemsRepository.save(problem);
  }

  async changeProblemState(problemId: number, state: ProblemState) {
    const problem = await this.getProblem(problemId);
    problem.state = state;

    return this.problemsRepository.save(problem);
  }
}