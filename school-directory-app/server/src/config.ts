import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const config = {
  port: process.env.PORT || 8080,
  database: {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    name: process.env.DB_NAME!,
  },
  paths: {
    uploadDir: path.join(process.cwd(), 'schoolImages'),
    staticImagesRoute: '/images',
  },
  cors: {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  },
  multer: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 10,
    allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  },
};
