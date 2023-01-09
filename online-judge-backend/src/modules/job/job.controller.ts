import { Controller, Get, Param } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('api')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('jobs/:jobId')
  async getJob(@Param('jobId') jobId: string) {
    return this.jobService.get(jobId);
  }
}
