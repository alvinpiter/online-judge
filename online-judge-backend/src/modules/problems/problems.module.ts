import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectStorageModule } from '../object-storage/object-storage.module';
import { PaginationModule } from '../pagination/pagination.module';
import { ProblemSolutionTemplate } from './entities/problem-solution-template.entity';
import { ProblemSolutionTemplatesService } from './services/problem-solution-templates.service';
import { ProblemTestCase } from './entities/problem-test-case.entity';
import { ProblemTestCasesService } from './services/problem-test-cases.service';
import { Problem } from './entities/problem.entity';
import { ProblemsService } from './services/problems.service';
import { ProblemTestCasesFormatter } from './formatters/problem-test-cases.formatter';
import { AdminProblemsController } from './controllers/admin-problems.controller';
import { AdminProblemTestCasesController } from './controllers/admin-problem-test-cases.controller';
import { AdminProblemSolutionTemplatesController } from './controllers/admin-problem-solution-templates.controller';
import { ProblemsController } from './controllers/problems.controller';
import { ProblemSolutionTemplatesController } from './controllers/problem-solution-templates.controller';
import { UserProblemAttemptsService } from './services/user-problem-attempts.service';
import { UserProblemAttempt } from './entities/user-problem-attempt.entity';
import { UserProblemAttemptDecoratorService } from './services/user-problem-attempt-decorator.service';
import { ProblemStatistics } from './entities/problem-statistics.entity';
import { ProblemStatisticsService } from './services/problem-statistics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Problem,
      ProblemStatistics,
      ProblemTestCase,
      ProblemSolutionTemplate,
      UserProblemAttempt,
    ]),
    ObjectStorageModule,
    PaginationModule,
  ],
  providers: [
    ProblemsService,
    ProblemStatisticsService,
    ProblemTestCasesService,
    ProblemTestCasesFormatter,
    ProblemSolutionTemplatesService,
    UserProblemAttemptsService,
    UserProblemAttemptDecoratorService,
  ],
  controllers: [
    AdminProblemsController,
    AdminProblemTestCasesController,
    AdminProblemSolutionTemplatesController,
    ProblemsController,
    ProblemSolutionTemplatesController,
  ],
  exports: [
    ProblemsService,
    ProblemStatisticsService,
    ProblemTestCasesService,
    ProblemTestCasesFormatter,
    UserProblemAttemptsService,
  ],
})
export class ProblemsModule {}
