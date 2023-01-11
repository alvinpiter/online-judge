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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Problem,
      ProblemTestCase,
      ProblemSolutionTemplate,
    ]),
    ObjectStorageModule,
    PaginationModule,
  ],
  providers: [
    ProblemsService,
    ProblemTestCasesService,
    ProblemTestCasesFormatter,
    ProblemSolutionTemplatesService,
  ],
  controllers: [
    AdminProblemsController,
    AdminProblemTestCasesController,
    AdminProblemSolutionTemplatesController,
    ProblemsController,
    ProblemSolutionTemplatesController,
  ],
})
export class ProblemsModule {}
