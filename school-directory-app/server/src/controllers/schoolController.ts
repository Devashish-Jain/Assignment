import { Request, Response } from 'express';
import pool from '../services/database';
import { School, SchoolResponse, ApiResponse } from '../types/index';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Helper function to store images in database
const storeImagesInDatabase = async (schoolId: number, files: Express.Multer.File[]): Promise<void> => {
  if (!files || files.length === 0) return;

  const insertImageQuery = `
    INSERT INTO school_images (school_id, image_name, image_data, mime_type)
    VALUES (?, ?, ?, ?)
  `;

  for (const file of files) {
    await pool.execute(insertImageQuery, [
      schoolId,
      file.originalname,
      file.buffer,
      file.mimetype
    ]);
  }
};

// Helper function to get images from database
const getImagesFromDatabase = async (schoolId: number): Promise<string[]> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    'SELECT id, image_name FROM school_images WHERE school_id = ?',
    [schoolId]
  );
  
  return (rows as any[]).map(row => row.id.toString()); // Return image IDs as strings
};

/**
 * Helper function to format Indian phone number
 */
const formatIndianPhoneNumber = (phoneNumber: string | number): string => {
  // Convert to string and remove any existing country code or special characters
  let cleanNumber = phoneNumber.toString().replace(/\D/g, '');
  
  // Remove existing +91 or 91 prefix if present
  if (cleanNumber.startsWith('91') && cleanNumber.length === 12) {
    cleanNumber = cleanNumber.substring(2);
  }
  
  // Ensure it's a 10-digit number
  if (cleanNumber.length !== 10) {
    throw new Error('Phone number must be exactly 10 digits');
  }
  
  // Add +91 prefix for Indian numbers
  return `+91${cleanNumber}`;
};

/**
 * Create a new school with image uploads
 */
export const createSchool = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, address, city, state, contact, email_id } = req.body;

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id) {
      res.status(400).json({
        success: false,
        error: 'All fields are required: name, address, city, state, contact, email_id'
      });
      return;
    }

    // Format phone number with +91 prefix
    let formattedContact: string;
    try {
      formattedContact = formatIndianPhoneNumber(contact);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: 'Invalid phone number. Please enter a valid 10-digit Indian phone number.'
      });
      return;
    }

    // Insert school into database first
    const insertQuery = `
      INSERT INTO schools (name, address, city, state, contact, email_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute<ResultSetHeader>(insertQuery, [
      name, address, city, state, formattedContact, email_id
    ]);

    const schoolId = result.insertId;

    // Store images in database
    const files = req.files as Express.Multer.File[] || [];
    await storeImagesInDatabase(schoolId, files);

    // Fetch the created school with images
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM schools WHERE id = ?',
      [schoolId]
    );

    if (rows.length === 0) {
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve created school'
      });
      return;
    }

    const school = rows[0] as School;
    const images = await getImagesFromDatabase(schoolId);
    const schoolResponse: SchoolResponse = {
      ...school,
      images
    };

    res.status(201).json({
      success: true,
      data: schoolResponse,
      message: 'School created successfully'
    });

  } catch (error) {
    console.error('Error creating school:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create school. Please try again.'
    });
  }
};

/**
 * Get all schools with optimized single query
 */
export const getAllSchools = async (req: Request, res: Response): Promise<void> => {
  try {
    // Single optimized query to get schools with image counts
    const [rows] = await pool.execute<RowDataPacket[]>(`
      SELECT 
        s.*,
        COALESCE(
          JSON_ARRAYAGG(
            CASE WHEN si.id IS NOT NULL 
            THEN CAST(si.id AS CHAR) 
            ELSE NULL END
          ), 
          JSON_ARRAY()
        ) as image_ids,
        COUNT(si.id) as image_count
      FROM schools s
      LEFT JOIN school_images si ON s.id = si.school_id
      GROUP BY s.id
      ORDER BY s.created_at DESC
    `);

    const schoolsResponse: SchoolResponse[] = (rows as any[]).map(row => {
      // Parse and filter out null values from JSON array
      const images = JSON.parse(row.image_ids).filter((id: any) => id !== null);
      return {
        id: row.id,
        name: row.name,
        address: row.address,
        city: row.city,
        state: row.state,
        contact: row.contact,
        email_id: row.email_id,
        created_at: row.created_at,
        images
      };
    });

    res.status(200).json({
      success: true,
      data: schoolsResponse
    });

  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch schools. Please try again.'
    });
  }
};

/**
 * Search schools by name, city, or state with optimized query
 */
export const searchSchools = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Search query parameter "q" is required'
      });
      return;
    }

    const searchTerm = `%${q.toLowerCase()}%`;
    // Optimized search query with single JOIN
    const searchQuery = `
      SELECT 
        s.*,
        COALESCE(
          JSON_ARRAYAGG(
            CASE WHEN si.id IS NOT NULL 
            THEN CAST(si.id AS CHAR) 
            ELSE NULL END
          ), 
          JSON_ARRAY()
        ) as image_ids
      FROM schools s
      LEFT JOIN school_images si ON s.id = si.school_id
      WHERE LOWER(s.name) LIKE ? 
         OR LOWER(s.city) LIKE ? 
         OR LOWER(s.state) LIKE ?
      GROUP BY s.id
      ORDER BY s.created_at DESC
    `;

    const [rows] = await pool.execute<RowDataPacket[]>(searchQuery, [
      searchTerm, searchTerm, searchTerm
    ]);

    const schoolsResponse: SchoolResponse[] = (rows as any[]).map(row => {
      // Parse and filter out null values from JSON array
      const images = JSON.parse(row.image_ids).filter((id: any) => id !== null);
      return {
        id: row.id,
        name: row.name,
        address: row.address,
        city: row.city,
        state: row.state,
        contact: row.contact,
        email_id: row.email_id,
        created_at: row.created_at,
        images
      };
    });

    res.status(200).json({
      success: true,
      data: schoolsResponse,
      message: `Found ${schoolsResponse.length} schools matching "${q}"`
    });

  } catch (error) {
    console.error('Error searching schools:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search schools. Please try again.'
    });
  }
};

/**
 * Get a single school by ID
 */
export const getSchoolById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      res.status(400).json({
        success: false,
        error: 'Valid school ID is required'
      });
      return;
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM schools WHERE id = ?',
      [parseInt(id)]
    );

    if (rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'School not found'
      });
      return;
    }

    const school = rows[0] as School;
    const schoolResponse: SchoolResponse = {
      ...school,
      images: JSON.parse(school.images || '[]')
    };

    res.status(200).json({
      success: true,
      data: schoolResponse
    });

  } catch (error) {
    console.error('Error fetching school by ID:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch school. Please try again.'
    });
  }
};

/**
 * Serve image from database
 */
export const getImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      res.status(400).json({
        success: false,
        error: 'Valid image ID is required'
      });
      return;
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT image_data, mime_type, image_name FROM school_images WHERE id = ?',
      [parseInt(id)]
    );

    if (rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Image not found'
      });
      return;
    }

    const imageData = rows[0] as any;
    
    res.setHeader('Content-Type', imageData.mime_type);
    res.setHeader('Content-Disposition', `inline; filename="${imageData.image_name}"`);
    res.send(imageData.image_data);

  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch image. Please try again.'
    });
  }
};
