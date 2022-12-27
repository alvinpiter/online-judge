import { Controller, Get } from '@nestjs/common';
import { SupportedProgrammingLanguages } from './constants';

@Controller('api')
export class GeneralController {
  @Get('supported-programming-languages')
  getSupportedProgrammingLanguages() {
    return SupportedProgrammingLanguages;
  }
}
