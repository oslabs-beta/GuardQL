import jwt from 'jsonwebtoken';

interface JwtPayloadWithUser extends jwt.JwtPayload {
  userId: string; 
  username: string; 
}

export function generateToken(userId: string, username: string): string {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT secret is missing');
  }

  return jwt.sign({ userId, username }, jwtSecret, { expiresIn: '1h' }); 
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayloadWithUser; 
    return decoded; 
  } catch (error) {
    throw new Error('Invalid token'); 
  }
}