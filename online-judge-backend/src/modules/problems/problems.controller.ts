import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectStorageService } from '../object-storage/object-storage.service';
import { ProblemTestCasesService } from './problem-test-cases.service';
import { CreateProblemDto } from './problems.dto';
import { ProblemsService } from './problems.service';

@Controller('api')
export class ProblemsController {
  constructor(
    private readonly problemsService: ProblemsService,
    private readonly problemTestCasesService: ProblemTestCasesService,
    private readonly objectStorageService: ObjectStorageService,
  ) {}

  @Post('problems')
  async createProblem(@Body() createProblemDto: CreateProblemDto) {
    return this.problemsService.createProblem(
      createProblemDto.name,
      createProblemDto.description,
    );
  }

  @Post('problems/:problemId/test-cases')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'inputFile', maxCount: 1 },
      { name: 'outputFile', maxCount: 1 },
    ]),
  )
  async addTestCase(
    @Param() params: { problemId: number },
    @UploadedFiles()
    files: {
      inputFile: Express.Multer.File[];
      outputFile: Express.Multer.File[];
    },
  ) {
    const problemTestCase = await this.problemTestCasesService.addTestCase(
      params.problemId,
      files.inputFile[0],
      files.outputFile[0],
    );

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
