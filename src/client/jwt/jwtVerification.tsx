// import { jwtDecode } from 'jwt-decode';

// export interface JwtPayload {
//   exp: number; 
//   [key: string]: any; 
// }

// export const isTokenExpired = (token: string | null): boolean => {
//   if (!token) return true; 
//   try {
//     const decodedToken = jwtDecode<JwtPayload>(token); 
//     const currentTime = Math.floor(Date.now() / 1000); 
//     return decodedToken.exp < currentTime; 

//   } catch (error) {
//     return true; 
//   }
// }; 