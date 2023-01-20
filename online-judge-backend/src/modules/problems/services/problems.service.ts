import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeORMPaginatedQueryBuilderAdapter } from '../../pagination/adapters/TypeORMPaginatedQueryBuilderAdapter';
import { OffsetPaginationService } from '../../pagination/offset-pagination.service';
import { Problem, ProblemState } from '../entities/problem.entity';
import { ProblemCreationDto } from '../data-transfer-objects/problem-creation.dto';
import { ProblemUpdateDto } from '../data-transfer-objects/problem-update.dto';
import { ProblemsGetDto } from '../data-transfer-objects/problems-get.dto';
import { ProblemsSelectQueryBuilder } from '../helpers/problems-select.query-builder';
import { User } from 'src/modules/users/user.entity';
import { UserProblemAttemptType } from '../entities/user-problem-attempt.entity';
import { UserProblemAttemptsService } from './user-problem-attempts.service';

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemsRepository: Repository<Problem>,
    private readonly offsetPaginationService: OffsetPaginationService,
    private readonly userProblemAttemptsService: UserProblemAttemptsService,
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

    // Maps problem id to user's UserProblemAttemptType
    const userAttemptTypesMap = new Map<number, UserProblemAttemptType>();
    if (user) {
      const userProblemAttempts =
        await this.userProblemAttemptsService.getUserProblemAttempts(
          user.id,
          problems.map((problem) => problem.id),
        );

      userProblemAttempts.forEach((userProblemAttempt) =>
        userAttemptTypesMap.set(
          userProblemAttempt.problemId,
          userProblemAttempt.getAttemptType(),
        ),
      );
    }

    const problemsWithUserAttemptType = problems.map((problem) => {
      const userAttemptType =
        userAttemptTypesMap.get(problem.id) ||
        UserProblemAttemptType.NOT_ATTEMPTED;

      return { ...problem, userAttemptType };
    });

    return {
      data: problemsWithUserAttemptType,
      meta,
    };
  }
}
