import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { config } from '../config';
import { 
  createSchool, 
  getAllSchools, 
  searchSchools, 
  getSchoolById,
  getImage 
} from '../controllers/schoolController';

const router = Router();

// Configure multer for memory storage (database storage)
const storage = multer.memoryStorage();

// File filter to allow only images
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (config.multer.allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed types: ${config.multer.allowedMimeTypes.join(', ')}`));
  }
};

// Configure multer middleware
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.multer.maxFileSize,
    files: config.multer.maxFiles
  }
});

// Error handling middleware for multer
const handleMulterError = (err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: `File too large. Maximum size allowed is ${config.multer.maxFileSize / 1024 / 1024}MB`
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        error: `Too many files. Maximum allowed is ${config.multer.maxFiles} files`
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        error: 'Unexpected file field. Use "images" as the field name'
      });
    }
  }
  
  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }

  next(err);
};

// Routes
router.post('/schools', upload.array('images', config.multer.maxFiles), handleMulterError, createSchool);
router.get('/schools', getAllSchools);
router.get('/schools/search', searchSchools);
router.get('/schools/:id', getSchoolById);
router.get('/images/:id', getImage);

export default router;
