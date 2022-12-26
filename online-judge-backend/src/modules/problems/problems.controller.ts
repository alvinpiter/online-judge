import { Body, Controller, Post } from '@nestjs/common';
import { CreateProblemDto } from './problems.dto';
import { ProblemsService } from './problems.service';

@Controller('api')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Post('problems')
  async createProblem(@Body() createProblemDto: CreateProblemDto) {
    return this.problemsService.createProblem(
      createProblemDto.name,
      createProblemDto.description,
    );
  }
}
