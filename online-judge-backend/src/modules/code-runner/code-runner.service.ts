import { Injectable } from '@nestjs/common';

@Injectable()
export class CodeRunnerService {
  runCode() {
    return 'Hello! From CodeRunnerService';
  }
}
