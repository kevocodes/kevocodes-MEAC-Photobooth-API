import * as Joi from 'joi';

export default Joi.object({
  PORT: Joi.number().default(3000),
  RATE_LIMIT_DEFAULT_TTL: Joi.number().required(),
  RATE_LIMIT_DEFAULT_LIMIT: Joi.number().required(),
  CLOUDINARY_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
  CLOUDINARY_FOLDER: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
});
