import { Controller, Post } from '@nestjs/common';
import { Readable } from 'stream';
import { ObjectStorageService } from './object-storage.service';

@Controller('api')
export class ObjectStorageController {
  constructor(private readonly objectStorageService: ObjectStorageService) {}

  @Post('upload-file')
  async uploadFile() {
    const stream = new Readable();
    stream.push('Hello, world!');
    stream.push(null);

    await this.objectStorageService.putObject('test-ajah', stream);

    return 'ok';
  }
}
