import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OptionalJwtGuard } from 'src/modules/authentication/guards/optional-jwt.guard';
import { User } from 'src/modules/users/user.entity';
import { ProblemsGetDto } from '../data-transfer-objects/problems-get.dto';
import { ProblemsService } from '../services/problems.service';

@Controller('api')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get('problems')
  @UseGuards(OptionalJwtGuard)
  async getProblems(
    @Query() problemsGetDto: ProblemsGetDto,
    @Request() request,
  ) {
    const user: User | undefined = request.user;
    return this.problemsService.getProblems(problemsGetDto, user);
  }

  @Get('problems/:problemId')
  async getProblem(@Param('problemId', ParseIntPipe) problemId: number) {
    return this.problemsService.getProblem(problemId);
  }
}
