import bcrypt from 'bcrypt';
import pool from './pool.mjs'; // Adjust path to match where your pool file is located
import { DbConnection } from '../Metrics/types.mjs'; 

// Function to get user by username
export const findUserByUsername = async (db: DbConnection, username: string) => {
  const result = await db.query('SELECT * FROM users WHERE username = $1', 
    [username]
  );
  return result.rows[0]; // Return the first row of the result or undefined if no user found
};

// Function to create a new user (optional)
export const createUser = async (db: DbConnection, username: string, password: string, email: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('This is the hashed password:', hashedPassword); 
  const result = await db.query(
    `INSERT INTO users 
     (username, password, email) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
     [username, hashedPassword, email]
  );
  return result.rows[0]; // Return the newly created user
};