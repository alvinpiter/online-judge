import { Injectable } from '@nestjs/common';
import { ObjectStorageService } from 'src/modules/object-storage/object-storage.service';
import { ProblemTestCase } from '../entities/problem-test-case.entity';

@Injectable()
export class ProblemTestCasesFormatter {
  constructor(private readonly objectStorageService: ObjectStorageService) {}

  async formatProblemTestCase(problemTestCase: ProblemTestCase) {
    return {
      id: problemTestCase.id,
      inputFile: {
        name: problemTestCase.inputFileName,
        url: await this.objectStorageService.getSignedUrl(
          problemTestCase.inputFileKey,
        ),
      },
      outputFile: {
        name: problemTestCase.outputFileName,
        url: await this.objectStorageService.getSignedUrl(
          problemTestCase.outputFileKey,
        ),
      },
    };
  }
}
