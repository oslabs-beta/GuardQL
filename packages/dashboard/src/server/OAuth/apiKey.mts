import crypto from 'crypto'; 

export function generateApiKey(): string {
  const prefix = 'guardql_';
  const randomBytes = crypto.randomBytes(16).toString('hex'); 
  return `${prefix}${randomBytes}`; 

}