import { findUserByUsername, createUser } from './userQueries.mjs'; // Importing the function to fetch users by username from userModel.ts
import { DbConnection } from '../Metrics/types.mjs'; 
import { generateToken } from './jwt.mjs'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

interface LoginInput {
  username: string; 
  password: string; 
}

interface CreateUserInput {
  username: string; 
  password: string; 
  email: string; 
}

const authResolvers = {
  Mutation: {
    login: async (_: any, { input }: { input: LoginInput }, { db }: { db: DbConnection }) => {
      // Retrieve user by username
      const user = await findUserByUsername(db, input.username);
    //   console.log('User data returned from the database:', user);
    //   console.log('User input begins here:', input);  
      // If user doesn't exist, throw error
      if (!user) {
        throw new Error('User not found');
      }
      //Using bcrypt to compare the hashed password stored in the database with the input password
      const validPassword = await bcrypt.compare(
        input.password,
        user.password
      );
      console.log('ValidPassword begins here:', validPassword);  

    // If password is incorrect, throw error
      if (!validPassword) {
        throw new Error('Invalid password');
      }

      const token = generateToken(user.id, user.username); 

      return {
        user: {
          id: user.id, 
          username: user.username
        }, 
        token // frontend will store this and use it for future requests 
      }; 
    },
    createUser: async (_: any, { input }: { input: CreateUserInput }, { db }: { db: DbConnection }) => {
      try {
        const user = await createUser(db, input.username, input.password, input.email); 
        return {
          code: 200, 
          success: true, 
          message: 'User created successfully'
        };
      } catch (error) {
        console.log('Error creating new user:', error); 
        return {
          code: 500, 
          success: false, 
          message: 'Failed to create new user'
        }; 
      }
    }
  },
    //! finish resolver 
//   Query: {
//     getUserProjects: async (_, __, { db, userId }) => {
//       if (!userId) {
//         throw new Error('Please log in to view your projects'); 
//       }
//       return getUserProjects(db, userId); 
//     }
//   }
};

export default authResolvers;
