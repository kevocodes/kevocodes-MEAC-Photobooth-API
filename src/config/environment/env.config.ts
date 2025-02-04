import { registerAs } from '@nestjs/config';

export default registerAs('env', () => ({
  rateLimit: {
    default: {
      ttl: parseInt(process.env.RATE_LIMIT_DEFAULT_TTL, 10),
      limit: parseInt(process.env.RATE_LIMIT_DEFAULT_LIMIT, 10),
    },
  },
  port: parseInt(process.env.PORT, 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    folder: process.env.CLOUDINARY_FOLDER,
  },
}));
