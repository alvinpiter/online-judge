import { Injectable } from '@nestjs/common';
import { Submission } from './entities/submission.entity';
import { SubmissionsService } from './submissions.service';

@Injectable()
export class SubmissionsEventSubscriber {
  constructor(submissionsService: SubmissionsService) {
    submissionsService.addSubscriber('submissionCreated', (submission) =>
      this.handleCreatedSubmission(submission),
    );
    submissionsService.addSubscriber('submissionCreated', (submission) =>
      this.handleCreatedSubmission2(submission),
    );
  }

  async handleCreatedSubmission(submission: Submission) {
    console.log(`First subscriber! ${submission.id}`);
  }

  async handleCreatedSubmission2(submission: Submission) {
    console.log(`Second subscriber! ${submission.id}`);
  }
}
