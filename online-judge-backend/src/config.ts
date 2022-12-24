import * as Joi from 'joi';

export enum ConfigKey {
  JWT_SECRET_KEY = 'JWT_SECRET_KEY',

  DATABASE_HOST = 'DATABASE_HOST',
  DATABASE_PORT = 'DATABASE_PORT',
  DATABASE_NAME = 'DATABASE_NAME',
  DATABASE_USERNAME = 'DATABASE_USERNAME',
  DATABASE_PASSWORD = 'DATABASE_PASSWORD',

  AWS_S3_ACCESS_KEY_ID = 'AWS_S3_ACCESS_KEY_ID',
  AWS_S3_SECRET_ACCESS_KEY = 'AWS_S3_SECRET_ACCESS_KEY',
  AWS_S3_BUCKET_NAME = 'AWS_S3_BUCKET_NAME',
  AWS_S3_BUCKET_REGION = 'AWS_S3_BUCKET_REGION',
}

export const ConfigSchemaMap: Record<ConfigKey, Joi.Schema> = {
  JWT_SECRET_KEY: Joi.string().required(),

  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),

  AWS_S3_ACCESS_KEY_ID: Joi.string().required(),
  AWS_S3_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_S3_BUCKET_NAME: Joi.string().required(),
  AWS_S3_BUCKET_REGION: Joi.string().required(),
};

export const ConfigSchema = Joi.object(ConfigSchemaMap);
