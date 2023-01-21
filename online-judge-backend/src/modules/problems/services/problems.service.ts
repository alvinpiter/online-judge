import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TypeORMPaginatedQueryBuilderAdapter } from '../../pagination/adapters/TypeORMPaginatedQueryBuilderAdapter';
import { OffsetPaginationService } from '../../pagination/offset-pagination.service';
import { Problem, ProblemState } from '../entities/problem.entity';
import { ProblemCreationDto } from '../data-transfer-objects/problem-creation.dto';
import { ProblemUpdateDto } from '../data-transfer-objects/problem-update.dto';
import { ProblemsGetDto } from '../data-transfer-objects/problems-get.dto';
import { ProblemsSelectQueryBuilder } from '../helpers/problems-select.query-builder';
import { User } from 'src/modules/users/user.entity';
import { UserProblemAttemptDecoratorService } from './user-problem-attempt-decorator.service';
import { orderEntitiesById } from 'src/lib/orderEntitiesById';

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemsRepository: Repository<Problem>,
    private readonly offsetPaginationService: OffsetPaginationService,
    private readonly userProblemAttemptDecoratorService: UserProblemAttemptDecoratorService,
  ) {}

  async getAdminProblems(problemsGetDto: ProblemsGetDto) {
    return this.doGetProblems(problemsGetDto);
  }

  async getProblems(problemsGetDto: ProblemsGetDto, user?: User) {
    problemsGetDto.state = ProblemState.PUBLISHED;
    return this.doGetProblems(problemsGetDto, user);
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

  private async doGetProblems(problemsGetDto: ProblemsGetDto, user?: User) {
    const qb = ProblemsSelectQueryBuilder.build(
      this.problemsRepository,
      problemsGetDto,
    );

    const { data: problems, meta } =
      await this.offsetPaginationService.paginate<Problem>(
        new TypeORMPaginatedQueryBuilderAdapter(qb),
        {
          offset: problemsGetDto.offset || DEFAULT_OFFSET,
          limit: problemsGetDto.limit || DEFAULT_LIMIT,
        },
      );

    const problemsWithStatistics = await this.getProblemsByIds(
      problems.map((problem) => problem.id),
      ['problemStatistics'],
    );

    return {
      data: user
        ? await this.userProblemAttemptDecoratorService.addUserAttemptTypeToProblems(
            problemsWithStatistics,
            user,
          )
        : problemsWithStatistics,
      meta,
    };
  }

  private async getProblemsByIds(ids: number[], relations: string[]) {
    const problems = await this.problemsRepository.find({
      where: { id: In(ids) },
      relations,
    });

    return orderEntitiesById(ids, problems);
  }
}
