import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config(); 

interface JwtPayloadWithUser extends jwt.JwtPayload {
  userId: string; 
  username: string; 
}

export function generateToken(userId: string, username: string): string {
  return jwt.sign(
    { userId, username },
    process.env.JWT_SECRET!, 
    { expiresIn: '1h' }
  ); 
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayloadWithUser; 
    return decoded; 
  } catch (error) {
    throw new Error('Invalid token'); 
  }
}