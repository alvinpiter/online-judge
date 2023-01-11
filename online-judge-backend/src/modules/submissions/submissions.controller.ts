import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../authentication/guards/jwt.guard';
import { User } from '../users/user.entity';
import { SubmissionCreationDto } from './data-transfer-objects/submission-creation.dto';
import { SubmissionFormatter } from './formatters/submission.formatter';
import { SubmissionsService } from './submissions.service';

@Controller('api')
export class SubmissionsController {
  constructor(
    private readonly submissionsService: SubmissionsService,
    private readonly submissionFormatter: SubmissionFormatter,
  ) {}

  @Post('submissions')
  @UseGuards(JwtGuard)
  async createSubmission(
    @Body() submissionCreationDto: SubmissionCreationDto,
    @Request() request,
  ) {
    const user: User = request.user;
    return this.submissionFormatter.format(
      await this.submissionsService.createSubmission(
        user.id,
        submissionCreationDto,
      ),
    );
  }
}
