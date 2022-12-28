import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectStorageService } from '../object-storage/object-storage.service';
import { ProblemSolutionTemplatesService } from './problem-solution-templates.service';
import { ProblemTestCase } from './problem-test-case.entity';
import { ProblemTestCasesService } from './problem-test-cases.service';
import {
  CreateProblemDto,
  UpsertProblemSolutionTemplateDto,
} from './problems.dto';
import { ProblemsService } from './problems.service';

@Controller('api')
export class ProblemsController {
  constructor(
    private readonly problemsService: ProblemsService,
    private readonly problemTestCasesService: ProblemTestCasesService,
    private readonly problemSolutionTemplatesService: ProblemSolutionTemplatesService,
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

    return this.formatProblemTestCase(problemTestCase);
  }

  @Get('problems/:problemId/test-cases')
  async getTestCases(@Param() params: { problemId: number }) {
    const problemTestCases = await this.problemTestCasesService.getTestCases(
      params.problemId,
    );

    return Promise.all(
      problemTestCases.map((tc) => this.formatProblemTestCase(tc)),
    );
  }

  @Delete('problems/:problemId/test-cases/:testCaseId')
  async deleteTestCase(
    @Param() params: { problemId: number; testCaseId: number },
  ) {
    return this.problemTestCasesService.deleteTestCase(
      params.problemId,
      params.testCaseId,
    );
  }

  @Post('problems/:problemId/solution-templates')
  async upsertSolutionTemplate(
    @Param() params: { problemId: number },
    @Body() body: UpsertProblemSolutionTemplateDto,
  ) {
    return this.problemSolutionTemplatesService.upsertTemplate(
      params.problemId,
      body.programmingLanguage,
      body.template,
    );
  }

  @Get('problems/:problemId/solution-templates')
  async getSolutionTemplates(@Param() params: { problemId: number }) {
    return this.problemSolutionTemplatesService.getTemplates(params.problemId);
  }

  private async formatProblemTestCase(problemTestCase: ProblemTestCase) {
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
