import * as Joi from 'joi';

export enum ConfigKey {
  APP_CREATOR_NAME = 'APP_CREATOR_NAME',
  JWT_SECRET_KEY = 'JWT_SECRET_KEY',
  ACCESS_TOKEN_EXPIRES_IN = 'ACCESS_TOKEN_EXPIRES_IN',
  AWS_S3_ACCESS_KEY_ID = 'AWS_S3_ACCESS_KEY_ID',
  AWS_S3_SECRET_ACCESS_KEY = 'AWS_S3_SECRET_ACCESS_KEY',
}

export const ConfigSchemaMap: Record<ConfigKey, Joi.Schema> = {
  APP_CREATOR_NAME: Joi.string().default('Alvin Piter'),
  JWT_SECRET_KEY: Joi.string().required(),
  ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
  AWS_S3_ACCESS_KEY_ID: Joi.string().required(),
  AWS_S3_SECRET_ACCESS_KEY: Joi.string().required(),
};

export const ConfigSchema = Joi.object(ConfigSchemaMap);
