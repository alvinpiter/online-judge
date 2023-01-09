import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectStorageModule } from '../object-storage/object-storage.module';
import { PaginationModule } from '../pagination/pagination.module';
import { ProblemSolutionTemplate } from './entities/problem-solution-template.entity';
import { ProblemSolutionTemplatesService } from './services/problem-solution-templates.service';
import { ProblemTestCase } from './entities/problem-test-case.entity';
import { ProblemTestCasesService } from './services/problem-test-cases.service';
import { Problem } from './entities/problem.entity';
import { ProblemsController } from './controllers/problems.controller';
import { ProblemsService } from './services/problems.service';
import { ProblemTestCasesController } from './controllers/problem-test-cases.controller';
import { ProblemSolutionTemplatesController } from './controllers/problem-solution-templates.controller';
import { ProblemTestCasesFormatter } from './formatters/problem-test-cases.formatter';

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
    ProblemsController,
    ProblemTestCasesController,
    ProblemSolutionTemplatesController,
  ],
})
export class ProblemsModule {}
