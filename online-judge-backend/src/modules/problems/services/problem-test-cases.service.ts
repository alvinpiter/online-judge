import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Readable } from 'stream';
import { Repository } from 'typeorm';
import { ObjectStorageService } from '../../object-storage/object-storage.service';
import { ProblemTestCase } from '../entities/problem-test-case.entity';
import { ProblemTestCaseWithContent } from '../interfaces/problem-test-case-with-content';

@Injectable()
export class ProblemTestCasesService {
  constructor(
    private readonly objectStorageService: ObjectStorageService,
    @InjectRepository(ProblemTestCase)
    private readonly problemTestCasesRepository: Repository<ProblemTestCase>,
  ) {}

  /*
  TODO:
  This design prevents us to have 2 test case files with the same name.
   */
  getTestCaseObjectKey(problemId: number, testCaseFileName: string): string {
    return `problems/${problemId}/test-cases/${testCaseFileName}`;
  }

  async addTestCase(
    problemId: number,
    inputFileName: string,
    inputFileReadable: Readable,
    outputFileName: string,
    outputFileReadable: Readable,
  ) {
    const inputFileKey = this.getTestCaseObjectKey(problemId, inputFileName);
    await this.objectStorageService.putObject(inputFileKey, inputFileReadable);

    const outputFileKey = this.getTestCaseObjectKey(problemId, outputFileName);
    await this.objectStorageService.putObject(
      outputFileKey,
      outputFileReadable,
    );

    // TODO: apply builder pattern?
    const problemTestCase = new ProblemTestCase();
    problemTestCase.problemId = problemId;
    problemTestCase.inputFileName = inputFileName;
    problemTestCase.inputFileKey = inputFileKey;
    problemTestCase.outputFileName = outputFileName;
    problemTestCase.outputFileKey = outputFileKey;

    return this.problemTestCasesRepository.save(problemTestCase);
  }

  async deleteTestCase(problemId: number, testCaseId: number) {
    const problemTestCase =
      await this.problemTestCasesRepository.findOneByOrFail({
        id: testCaseId,
        problemId,
      });

    await this.problemTestCasesRepository.delete({
      id: testCaseId,
      problemId,
    });

    return problemTestCase;
  }

  async getTestCases(problemId: number) {
    return this.problemTestCasesRepository.findBy({ problemId });
  }

  async getTestCasesWithContent(
    problemId: number,
  ): Promise<ProblemTestCaseWithContent[]> {
    const testCases = await this.getTestCases(problemId);
    return Promise.all(
      testCases.map(async (testCase) => ({
        id: testCase.id,
        input: await this.objectStorageService.getObjectContentAsString(
          testCase.inputFileKey,
        ),
        output: await this.objectStorageService.getObjectContentAsString(
          testCase.outputFileKey,
        ),
      })),
    );
  }
}
