import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  SubmissionRunDetail,
  SubmissionRunDetailWithoutId,
} from '../entities/submission-run-detail.entity';

@Injectable()
export class SubmissionRunDetailsService {
  constructor(
    @InjectRepository(SubmissionRunDetail)
    private readonly submissionRunDetailsRepository: Repository<SubmissionRunDetail>,
  ) {}

  async saveSubmissionRunDetails(
    submissionRunDetails: SubmissionRunDetailWithoutId[],
  ) {
    return Promise.all(
      submissionRunDetails.map((detail) =>
        this.submissionRunDetailsRepository.save(detail),
      ),
    );
  }
}
