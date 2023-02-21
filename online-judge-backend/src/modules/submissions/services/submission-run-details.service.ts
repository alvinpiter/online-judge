import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hasValue } from 'src/lib/hasValue';
import { ObjectStorageService } from 'src/modules/object-storage/object-storage.service';
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
    private readonly objectStorageService: ObjectStorageService,
  ) {}

  async saveSubmissionRunDetails(
    submissionRunDetails: SubmissionRunDetailWithoutId[],
  ) {
    return Promise.all(
      submissionRunDetails.map(async (runDetail) => {
        const outputFileKey = this.getOutputFileKey(
          runDetail.submissionId,
          runDetail.testCaseId,
        );

        await this.objectStorageService.putObjectBuffer(
          outputFileKey,
          Buffer.from(runDetail.output || ''),
        );

        await this.submissionRunDetailsRepository.save({
          submissionId: runDetail.submissionId,
          testCaseId: runDetail.testCaseId,
          output: '',
          outputFileKey,
          runTimeInMilliseconds: runDetail.runTimeInMilliseconds,
          memoryUsageInKilobytes: runDetail.memoryUsageInKilobytes,
          verdict: runDetail.verdict,
        });
      }),
    );
  }

  private getOutputFileKey(submissionId: number, testCaseId: number) {
    return `submissions/${submissionId}/outputs/${testCaseId}.txt`;
  }
}
