import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProblemSolutionTemplateUpsertDto } from '../data-transfer-objects/problem-solution-template-upsert.dto';
import { ProblemSolutionTemplate } from '../entities/problem-solution-template.entity';

@Injectable()
export class ProblemSolutionTemplatesService {
  constructor(
    @InjectRepository(ProblemSolutionTemplate)
    private readonly problemSolutionTemplatesRepository: Repository<ProblemSolutionTemplate>,
  ) {}

  async upsertTemplate(
    problemId: number,
    problemSolutionTemplateUpsertDto: ProblemSolutionTemplateUpsertDto,
  ) {
    const { programmingLanguage, template } = problemSolutionTemplateUpsertDto;

    const existingTemplate =
      await this.problemSolutionTemplatesRepository.findOneBy({
        problemId,
        programmingLanguage,
      });

    if (!existingTemplate) {
      const newTemplate = new ProblemSolutionTemplate();
      newTemplate.problemId = problemId;
      newTemplate.programmingLanguage = programmingLanguage;
      newTemplate.template = template;

      return this.problemSolutionTemplatesRepository.save(newTemplate);
    } else {
      existingTemplate.template = template;

      return this.problemSolutionTemplatesRepository.save(existingTemplate);
    }
  }

  async getTemplates(problemId: number) {
    return this.problemSolutionTemplatesRepository.findBy({ problemId });
  }
}
