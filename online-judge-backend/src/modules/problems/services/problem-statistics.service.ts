import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProblemStatistics } from '../entities/problem-statistics.entity';

@Injectable()
export class ProblemStatisticsService {
  constructor(
    @InjectRepository(ProblemStatistics)
    private readonly problemStatisticsRepository: Repository<ProblemStatistics>,
  ) {}

  async increaseSolverCount(problemId: number) {
    const existingProblemStatistics =
      await this.problemStatisticsRepository.findOneBy({
        problemId,
      });

    if (existingProblemStatistics) {
      existingProblemStatistics.solverCount += 1;
      return this.problemStatisticsRepository.save(existingProblemStatistics);
    } else {
      const problemStatistics = new ProblemStatistics();
      problemStatistics.problemId = problemId;
      problemStatistics.solverCount = 1;

      return this.problemStatisticsRepository.save(problemStatistics);
    }
  }
}
