import { ApolloServer } from '@apollo/server';
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


async function startApolloServer() {
  try {
    const server = new ApolloServer<MyContext>({
      typeDefs,
      resolvers,
    }); 

    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => {
        // console.log('Request headers:', req.headers); 
        const token = req.headers.authorization?.replace('Bearer ', '');
        // console.log('Extracted token:', token); 
        let userId: string | null = null; 

        if (token) {
          try {
            const decoded = verifyToken(token); 
            // console.log('Decoded token:', decoded); 
            userId = decoded.userId; 
          } catch (error) {
            console.error('Token verification failed:', error); 
          }
        } else {
          console.error('No token provided in request'); 
        }
        // console.log('Final userId:', userId);
        return {
          db: pool, 
          userId, // this will be null if no token or invalid token 
        }; 
      }, 
    }); 
    console.log(`🚀 Server is running at ${url}`);
  } catch (error) {
    console.error('🚀 Error starting up the server:', error);
  }
}

startApolloServer(); 
