import * as Joi from 'joi';

export enum ConfigKey {
  APP_CREATOR_NAME = 'APP_CREATOR_NAME',
  AWS_S3_ACCESS_KEY_ID = 'AWS_S3_ACCESS_KEY_ID',
  AWS_S3_SECRET_ACCESS_KEY = 'AWS_S3_SECRET_ACCESS_KEY',
}

export const ConfigSchemaMap: Record<ConfigKey, Joi.Schema> = {
  APP_CREATOR_NAME: Joi.string().default('Alvin Piter'),
  AWS_S3_ACCESS_KEY_ID: Joi.string(),
  AWS_S3_SECRET_ACCESS_KEY: Joi.string(),
};

export const ConfigSchema = Joi.object(ConfigSchemaMap);
