import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { ObjectStorageService } from './object-storage.service';

class UploadFileDto {
  fileName: string;
  file: File;
}

@Controller('api')
export class ObjectStorageController {
  constructor(private readonly objectStorageService: ObjectStorageService) {}

  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() body: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileUrl = await this.objectStorageService.putObject(
      body.fileName,
      Readable.from(file.buffer),
    );

    return {
      fileName: body.fileName,
      fileUrl,
    };
  }
}
