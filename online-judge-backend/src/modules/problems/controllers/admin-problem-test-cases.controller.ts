import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { ProblemTestCasesFormatter } from '../formatters/problem-test-cases.formatter';
import { ProblemTestCasesService } from '../services/problem-test-cases.service';

@Controller('api/admin')
export class AdminProblemTestCasesController {
  constructor(
    private readonly problemTestCasesService: ProblemTestCasesService,
    private readonly problemTestCasesFormatter: ProblemTestCasesFormatter,
  ) {}

  @Post('problems/:problemId/test-cases')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'inputFile', maxCount: 1 },
      { name: 'outputFile', maxCount: 1 },
    ]),
  )
  async addTestCase(
    @Param('problemId', ParseIntPipe) problemId: number,
    @UploadedFiles()
    files: {
      inputFile: Express.Multer.File[];
      outputFile: Express.Multer.File[];
    },
  ) {
    const problemTestCase = await this.problemTestCasesService.addTestCase(
      problemId,
      files.inputFile[0].originalname,
      Readable.from(files.inputFile[0].buffer),
      files.outputFile[0].originalname,
      Readable.from(files.outputFile[0].buffer),
    );

    return this.problemTestCasesFormatter.formatProblemTestCase(
      problemTestCase,
    );
  }

  @Get('problems/:problemId/test-cases')
  async getTestCases(@Param('problemId', ParseIntPipe) problemId: number) {
    const problemTestCases = await this.problemTestCasesService.getTestCases(
      problemId,
    );

    return Promise.all(
      problemTestCases.map((tc) =>
        this.problemTestCasesFormatter.formatProblemTestCase(tc),
      ),
    );
  }

  @Delete('problems/:problemId/test-cases/:testCaseId')
  async deleteTestCase(
    @Param('problemId', ParseIntPipe) problemId: number,
    @Param('testCaseId', ParseIntPipe) testCaseId: number,
  ) {
    return this.problemTestCasesService.deleteTestCase(problemId, testCaseId);
  }
}
