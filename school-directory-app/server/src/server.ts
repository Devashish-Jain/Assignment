import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import { config } from './config';
import { testConnection, initializeDatabase } from './services/database';
import schoolRoutes from './routes/schoolRoutes';

// Create Express application
const app: Application = express();

// Global error handler
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  
  res.status(500).json({
    success: false,
    error: 'Internal server error occurred. Please try again.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Initialize server
const initializeServer = async () => {
  try {
    // Test database connection
    const isDbConnected = await testConnection();
    if (!isDbConnected) {
      console.error('❌ Failed to connect to database. Exiting...');
      process.exit(1);
    }

    // Initialize database schema
    await initializeDatabase();
    console.log('✅ Connected to database successfully');

    // Middleware setup
    app.use(compression()); // Enable response compression
    app.use(cors(config.cors));
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Serve static images from schoolImages directory
    app.use(config.paths.staticImagesRoute, express.static(config.paths.uploadDir));

    // Request logging middleware (development only)
    if (process.env.NODE_ENV === 'development') {
      app.use((req: Request, res: Response, next: NextFunction) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
      });
    }

    // Health check endpoint
    app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({
        success: true,
        message: 'Server is running successfully',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      });
    });

    // API routes
    app.use('/api', schoolRoutes);

    // Handle 404 errors
    app.use('*', (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        error: `Route ${req.originalUrl} not found`,
        message: 'The requested endpoint does not exist'
      });
    });

    // Global error handling middleware
    app.use(errorHandler);

    // Start server
    const port = config.port;
    app.listen(port, () => {
      console.log(`
🚀 School Directory Server Started Successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Server running on: http://localhost:${port}
✅ API base URL: http://localhost:${port}/api
✅ Health check: http://localhost:${port}/health
✅ Images served at: http://localhost:${port}${config.paths.staticImagesRoute}
✅ Environment: ${process.env.NODE_ENV || 'development'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Available Endpoints:
   POST   /api/schools           - Create new school
   GET    /api/schools           - Get all schools  
   GET    /api/schools/search?q= - Search schools
   GET    /api/schools/:id       - Get school by ID
`);
    });

  } catch (error) {
    console.error('❌ Failed to initialize server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions and unhandled promise rejections
process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

// Initialize the server
initializeServer();
