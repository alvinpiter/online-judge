import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Readable } from 'stream';
import { Repository } from 'typeorm';
import { ObjectStorageService } from '../object-storage/object-storage.service';
import { ProblemTestCase } from './problem-test-case.entity';

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
    inputFile: Express.Multer.File,
    outputFile: Express.Multer.File,
  ) {
    const inputFileName = inputFile.originalname;
    const inputFileKey = this.getTestCaseObjectKey(problemId, inputFileName);
    await this.objectStorageService.putObject(
      inputFileKey,
      Readable.from(inputFile.buffer),
    );

    const outputFileName = outputFile.originalname;
    const outputFileKey = this.getTestCaseObjectKey(problemId, outputFileName);
    await this.objectStorageService.putObject(
      outputFileKey,
      Readable.from(outputFile.buffer),
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
}
