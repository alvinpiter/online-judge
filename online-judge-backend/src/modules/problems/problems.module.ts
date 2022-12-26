import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectStorageModule } from '../object-storage/object-storage.module';
import { ProblemTestCase } from './problem-test-case.entity';
import { ProblemTestCasesService } from './problem-test-cases.service';
import { Problem } from './problem.entity';
import { ProblemsController } from './problems.controller';
import { ProblemsService } from './problems.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Problem, ProblemTestCase]),
    ObjectStorageModule,
  ],
  providers: [ProblemsService, ProblemTestCasesService],
  controllers: [ProblemsController],
})
export class ProblemsModule {}
