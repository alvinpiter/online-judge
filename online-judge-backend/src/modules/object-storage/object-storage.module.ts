import { Module } from '@nestjs/common';
import { ObjectStorageController } from './object-storage.controller';
import { ObjectStorageService } from './object-storage.service';

@Module({
  providers: [ObjectStorageService],
  controllers: [ObjectStorageController],
})
export class ObjectStorageModule {}
