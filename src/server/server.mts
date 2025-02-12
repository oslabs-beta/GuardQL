import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import authResolvers from './OAuth/authResolvers.mjs';
import metricResolvers from './Metrics/metricResolvers.mjs';
import { gql } from 'graphql-tag';
// import { Context } from './backendOauth/pool.mjs';
import { Pool } from 'pg';
import pool from './OAuth/pool.mjs';
import { verifyToken } from './OAuth/jwt.mjs';
import { MyContext } from './Metrics/types.mjs';
import jwt from 'jsonwebtoken';
import { verifyApiKey } from './Metrics/databaseQueries.mjs';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// reading graphql schema files
const authTypeDefs = gql(
  readFileSync(path.resolve(__dirname, './OAuth/authSchema.graphql'), {
    encoding: 'utf-8',
  })
);

const metricTypeDefs = gql(
  readFileSync(path.resolve(__dirname, './Metrics/metricSchema.graphql'), {
    encoding: 'utf-8',
  })
);

// combining schemas
// const typeDefs = `
//   ${authTypeDefs}
//   ${metricTypeDefs}
// `;
const typeDefs = [authTypeDefs, metricTypeDefs];

// interface JwtPayloadWithUser extends jwt.JwtPayload {
//   userId: string;
//   username: string;
// }
// export interface Context {
//   db: Pool;
// }

// combining resolvers
const resolvers = {
  Query: {
    // ...authResolvers.Query,
    ...metricResolvers.Query
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...metricResolvers.Mutation
  }
};

// async function startApolloServer() {
//   try {
//     const server = new ApolloServer<MyContext>({
//       typeDefs,
//       resolvers,
//     });

//     const { url } = await startStandaloneServer(server, {
//       context: async ({ req }) => {
//         // console.log('Request headers:', req.headers);
//         const token = req.headers.authorization?.replace('Bearer ', '');
//         // console.log('Extracted token:', token);
//         const apiKeyHeader = req.headers['api-key'];
//         const apiKey = Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader;

//         let userId: string | null = null;

//         if (token) {
//           try {
//             const decoded = verifyToken(token);
//             // console.log('Decoded token begins here:', decoded);
//             // console.log('Decoded token:', decoded);
//             userId = decoded.userId;
//           } catch (error) {
//             console.error('Token verification failed:', error);
//           }
//         } else if (apiKey) {
//           const user = await verifyApiKey(pool, apiKey);
//           if (user) {
//             userId = user.id;
//           }
//         }
//         // console.log('Final userId:', userId);
//         return {
//           db: pool,
//           userId, // this will be null if no token or invalid token
//         };
//       },

//     });
//     console.log(`🚀 Server is running at ${url}`);
//   } catch (error) {
//     console.error('🚀 Error starting up the server:', error);
//   }
// }

// startApolloServer();

/** Express Middleware Version! --> This is to resolve the Cross-Origin Policy Issue */
// Create an Express app to handle middleware
const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8081';

// Set up CORS middleware
app.use(cors({
  origin: FRONTEND_URL, // Dynamically accept the frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// **Add JSON Middleware Here**
// Make sure to parse the body as JSON before Apollo Server handles the request
app.use(express.json());

// Create an Apollo Server instance
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

// Start Apollo Server and integrate with Express
async function startApolloServer() {
  try {
    await server.start(); // Start Apollo Server

  // Use Apollo Server middleware for GraphQL endpoint
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      // Handle your context setup, token extraction, etc.
      const token = req.headers.authorization?.replace('Bearer ', '');
      const apiKeyHeader = req.headers['api-key'];
      const apiKey = Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader;

      let userId: string | null = null;

      if (token) {
        try {
          const decoded = verifyToken(token);
          userId = decoded.userId;
        } catch (error) {
          console.error('Token verification failed:', error);
        }
      } else if (apiKey) {
        const user = await verifyApiKey(pool, apiKey);
        if (user) {
          userId = user.id;
        }
      }

      return {
        db: pool,
        userId, // userId will be null if no token or invalid token
      };
    }
  }));

    // Start Express server
    app.listen(4000, () => {
      console.log('🚀 Server is running at http://localhost:4000/graphql');
    });
  } catch (error) {
    console.error('🚀 Error starting Apollo Server:', error);
  }
}

startApolloServer();