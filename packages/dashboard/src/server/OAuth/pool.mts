//Database conection setup
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg; 

// Connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
  // common setting for development. 
  // ssl: {
  //   rejectUnauthorized: false
  // }
});
pool.connect((err) => {
  if (err) {
    console.error('Database connection error:', err); 
  } else {
    console.log('🚀 Successfully connected to database'); 
  }
}); 

export default pool; 
