import { Controller, Post } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';

@Controller('api')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post('submissions')
  submit() {
    return this.submissionsService.submit();
  }
}
