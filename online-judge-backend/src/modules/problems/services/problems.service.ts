import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { TypeORMPaginatedQueryBuilderAdapter } from '../../pagination/adapters/TypeORMPaginatedQueryBuilderAdapter';
import { OffsetPaginationService } from '../../pagination/offset-pagination.service';
import { Problem, ProblemState } from '../entities/problem.entity';
import { ProblemCreationDto } from '../data-transfer-objects/problem-creation.dto';
import { ProblemUpdateDto } from '../data-transfer-objects/problem-update.dto';
import { ProblemsGetDto } from '../data-transfer-objects/problems-get.dto';
import { UserProblemsGetDto } from '../data-transfer-objects/user-problems-get.dto';
import { ProblemsSelectQueryBuilder } from '../helpers/problems-select.query-builder';

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
    const qb = new ProblemsSelectQueryBuilder(this.problemsRepository);

    if (problemsGetDto.state) {
      problemsGetDto && qb.applyStateFilter(problemsGetDto.state);
    }

    qb.applyOrder(problemsGetDto.order);

    return this.doGetProblems(
      qb.getQueryBuilder(),
      problemsGetDto.offset,
      problemsGetDto.limit,
    );
  }

  async getUserProblems(userProblemsGetDto: UserProblemsGetDto) {
    const qb = new ProblemsSelectQueryBuilder(this.problemsRepository);

    qb.applyStateFilter(ProblemState.PUBLISHED);

    qb.applyOrder(userProblemsGetDto.order);

    return this.doGetProblems(
      qb.getQueryBuilder(),
      userProblemsGetDto.offset,
      userProblemsGetDto.limit,
    );
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

  private async doGetProblems(
    qb: SelectQueryBuilder<Problem>,
    offset = DEFAULT_OFFSET,
    limit = DEFAULT_LIMIT,
  ) {
    return this.offsetPaginationService.paginate<Problem>(
      new TypeORMPaginatedQueryBuilderAdapter(qb),
      { offset, limit },
    );
  }
}
