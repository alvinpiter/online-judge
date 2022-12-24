import { Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { ConfigKey } from 'src/config';
import { Readable } from 'stream';
import { streamToBuffer } from 'src/lib/streamToBuffer';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectError } from './errors/PutObjectError';
import { GetObjectError } from './errors/GetObjectError';
import { DeleteObjectError } from './errors/DeleteObjectError';

@Injectable()
export class ObjectStorageService {
  private client: S3Client;
  private bucketName: string;

  constructor(configService: ConfigService) {
    this.client = new S3Client({
      region: configService.get(ConfigKey.AWS_S3_BUCKET_REGION),
      credentials: {
        accessKeyId: configService.get(ConfigKey.AWS_S3_ACCESS_KEY_ID),
        secretAccessKey: configService.get(ConfigKey.AWS_S3_SECRET_ACCESS_KEY),
      },
    });
    this.bucketName = configService.get(ConfigKey.AWS_S3_BUCKET_NAME);
  }

  async putObject(key: string, body: Readable) {
    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: key,
          Body: await streamToBuffer(body),
        }),
      );

      return this.getSignedUrl(key);
    } catch (e) {
      throw new PutObjectError(e.message);
    }
  }

  async getSignedUrl(key: string) {
    try {
      return getSignedUrl(
        this.client,
        new GetObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        }),
      );
    } catch (e) {
      throw new GetObjectError(e.message);
    }
  }

  async deleteObject(key: string) {
    try {
      await this.client.send(
        new DeleteObjectCommand({ Bucket: this.bucketName, Key: key }),
      );
    } catch (e) {
      throw new DeleteObjectError(e.message);
    }
  }
}
