// import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
// import { jest } from '@jest/globals';
// import { Pool } from 'pg';
// import { verifyToken } from '../OAuth/jwt.mjs';
// import { verifyApiKey } from '../Metrics/databaseQueries.mjs';

// // Mock the file reading operations
// jest.mock('fs', () => ({
//   readFileSync: jest.fn().mockReturnValue(`
//     type Query {
//       _empty: String
//     }
//     type Mutation {
//       _empty: String
//     }
//   `)
// }));

// // Mock the database pool
// jest.mock('../OAuth/pool.mts', () => ({
//   pool: {
//     query: jest.fn(),
//   },
// }));

// // Mock JWT verification
// jest.mock('../OAuth/jwt.mjs', () => ({
//   verifyToken: jest.fn(),
// }));

// // Mock API key verification
// jest.mock('../OAuth/apiKey.mjs', () => ({
//   verifyApiKey: jest.fn(),
// }));

// describe('Apollo Server Setup', () => {
//   let server: ApolloServer;

//   beforeEach(() => {
//     // Clear all mocks before each test
//     jest.clearAllMocks();
//   });

//   it('should create a new Apollo Server instance', async () => {
//     const { startApolloServer } = await import('../server.mjs');
//     await startApolloServer();
    
//     // Verify server was started
//     expect(startStandaloneServer).toHaveBeenCalled();
//   });

//   describe('Context Creation', () => {
//     it('should handle JWT authentication', async () => {
//       const mockToken = 'valid.jwt.token';
//       const mockUserId = 'user123';
      
//       (verifyToken as jest.Mock).mockReturnValue({ userId: mockUserId });

//       const req = {
//         headers: {
//           authorization: `Bearer ${mockToken}`,
//         },
//       };

//       const { startApolloServer } = await import('../server.mjs');
//       const server = await startApolloServer();
      
//       const contextValue = await server.context({ req });
      
//       expect(contextValue).toEqual({
//         db: expect.any(Pool),
//         userId: mockUserId,
//       });
//       expect(verifyToken).toHaveBeenCalledWith(mockToken);
//     });

//     it('should handle API key authentication', async () => {
//       const mockApiKey = 'valid-api-key';
//       const mockUserId = 'user123';
      
//       (verifyApiKey as jest.Mock).mockResolvedValue({ id: mockUserId });

//       const req = {
//         headers: {
//           'api-key': mockApiKey,
//         },
//       };

//       const { startApolloServer } = await import('../server.mts');
//       const server = await startApolloServer();
      
//       const contextValue = await server.context({ req });
      
//       expect(contextValue).toEqual({
//         db: expect.any(Pool),
//         userId: mockUserId,
//       });
//       expect(verifyApiKey).toHaveBeenCalledWith(expect.any(Pool), mockApiKey);
//     });

//     it('should handle invalid JWT token', async () => {
//       (verifyToken as jest.Mock).mockImplementation(() => {
//         throw new Error('Invalid token');
//       });

//       const req = {
//         headers: {
//           authorization: 'Bearer invalid.token',
//         },
//       };

//       const { startApolloServer } = await import('../server.mts');
//       const server = await startApolloServer();
      
//       const contextValue = await server.context({ req });
      
//       expect(contextValue).toEqual({
//         db: expect.any(Pool),
//         userId: null,
//       });
//     });

//     it('should handle invalid API key', async () => {
//       (verifyApiKey as jest.Mock).mockResolvedValue(null);

//       const req = {
//         headers: {
//           'api-key': 'invalid-api-key',
//         },
//       };

//       const { startApolloServer } = await import('../server.mts');
//       const server = await startApolloServer();
      
//       const contextValue = await server.context({ req });
      
//       expect(contextValue).toEqual({
//         db: expect.any(Pool),
//         userId: null,
//       });
//     });

//     it('should handle missing authentication', async () => {
//       const req = {
//         headers: {},
//       };

//       const { startApolloServer } = await import('../server.mts');
//       const server = await startApolloServer();
      
//       const contextValue = await server.context({ req });
      
//       expect(contextValue).toEqual({
//         db: expect.any(Pool),
//         userId: null,
//       });
//     });
//   });

//   describe('Error Handling', () => {
//     it('should handle server startup errors', async () => {
//       const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
//       // Mock startStandaloneServer to throw an error
//       (startStandaloneServer as jest.Mock).mockRejectedValue(new Error('Startup failed'));

//       const { startApolloServer } = await import('../server.mts');
//       await startApolloServer();

//       expect(consoleSpy).toHaveBeenCalledWith(
//         '🚀 Error starting up the server:',
//         expect.any(Error)
//       );

//       consoleSpy.mockRestore();
//     });
//   });
// });