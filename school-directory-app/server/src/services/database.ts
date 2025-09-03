import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!),
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false,
  },
  connectTimeout: 60000,
  authPlugins: {
    mysql_native_password: () => Buffer.alloc(0)
  }
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test connection function
export const testConnection = async (): Promise<boolean> => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully to SkySQL');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
};

// Create database if it doesn't exist
export const createDatabaseIfNotExists = async (): Promise<void> => {
  try {
    // Connect without specifying database to create it if needed
    const tempConfig = {
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!),
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      ssl: { rejectUnauthorized: false },
      connectTimeout: 60000
    };

    const tempPool = mysql.createPool(tempConfig);
    
    // Check if database exists, create if not
    const [databases] = await tempPool.execute(
      'SHOW DATABASES LIKE ?',
      [process.env.DB_NAME!]
    );

    if ((databases as any[]).length === 0) {
      await tempPool.execute(`CREATE DATABASE ${process.env.DB_NAME!}`);
      console.log(`✅ Database '${process.env.DB_NAME}' created successfully`);
    } else {
      console.log(`✅ Database '${process.env.DB_NAME}' already exists`);
    }
    
    await tempPool.end();
  } catch (error) {
    console.error('❌ Failed to create database:', error);
    // If database creation fails, continue anyway - it might already exist
    console.log('⚠️ Continuing with existing database configuration...');
  }
};

// Initialize database schema with image storage in database
export const initializeDatabase = async (): Promise<void> => {
  try {
    const connection = await pool.getConnection();
    
    // Create the schools table with LONGBLOB for images
    const createSchoolsTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        contact BIGINT NOT NULL,
        email_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    // Create separate table for images stored as BLOB
    const createImagesTableQuery = `
      CREATE TABLE IF NOT EXISTS school_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        school_id INT NOT NULL,
        image_name VARCHAR(255) NOT NULL,
        image_data LONGBLOB NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
      );
    `;
    
    await connection.execute(createSchoolsTableQuery);
    await connection.execute(createImagesTableQuery);
    console.log('✅ Database schema initialized successfully');
    
    connection.release();
  } catch (error) {
    console.error('❌ Failed to initialize database schema:', error);
    throw error;
  }
};

export default pool;
