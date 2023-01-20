import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmissionCompilationDetail } from '../entities/submission-compilation-detail.entity';

@Injectable()
export class SubmissionCompilationDetailsService {
  constructor(
    @InjectRepository(SubmissionCompilationDetail)
    private readonly submissionCompilationDetailsRepository: Repository<SubmissionCompilationDetail>,
  ) {}

  async createSubmissionCompilationDetail(
    submissionId: number,
    message: string,
  ) {
    const submissionCompilationDetail = new SubmissionCompilationDetail();
    submissionCompilationDetail.submissionId = submissionId;
    submissionCompilationDetail.message = message;

    return this.submissionCompilationDetailsRepository.save(
      submissionCompilationDetail,
    );
  }
}
