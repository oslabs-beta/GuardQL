import { gql } from 'graphql-tag';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

import pool from './OAuth/pool.mjs'; 
import authResolvers from './OAuth/authResolvers.mjs';
import metricResolvers from './Metrics/metricResolvers.mjs';
import { verifyToken } from './OAuth/jwt.mjs'; 
import { verifyApiKey } from './Metrics/databaseQueries.mjs'; 
import { MyContext } from './Metrics/types.mjs';



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

const typeDefs = [authTypeDefs, metricTypeDefs]; 

// combining resolvers
const resolvers = {
  Query: {
    ...metricResolvers.Query
  }, 
  Mutation: {
    ...authResolvers.Mutation, 
    ...metricResolvers.Mutation
  }
}; 

export async function startApolloServer() {
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
        const apiKeyHeader = req.headers['api-key']; 
        const apiKey = Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader;
        
        let userId: string | null = null; 

        if (token) {
          try {
            const decoded = verifyToken(token); 
            // console.log('Decoded token begins here:', decoded); 
            // console.log('Decoded token:', decoded); 
            userId = decoded.userId; 
          } catch (error) {
            // console.error('Token verification failed:', error); 
          }
        } else if (apiKey) {
          // console.log('The api key begins here:', apiKey); 
          const user = await verifyApiKey(pool, apiKey); 
          if (user) {
            // console.log('The user from verifying the api key begins here:', user); 
            userId = user.id; 
            // console.log('This is the userId after extracting it from the api key:', userId);
          } else if (!user) {
            // console.log('The falsy user from verifying the api key begins here:', user); 
          }
        }
        // console.log('Final userId:', userId);
        return {
          db: pool, 
          userId, // this will be null if no token or invalid token 
        }; 
      }, 
    }); 
    console.log(`🚀 Server is running at ${url}`);
    return server; 
  } catch (error) {
    console.error('🚀 Error starting up the server:', error);
  }
}

startApolloServer(); 
