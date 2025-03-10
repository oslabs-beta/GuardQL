import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export interface JwtPayload {
  exp: number;
  [key: string]: any;
}

/**
 * For DEPLOYMENT: process.env.BACKEND_URL
 * For LOCALHOST: 'http://localhost:4000/graphql'
*/

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql', // Change between the environment variable or local host
  credentials: 'include'
})

const authLink = new ApolloLink((operation, forward) => {
  // console.log('Operation name begins here:', operation.operationName);
  // console.log('Operation variables begins here:', operation.variables);
  const jwt = localStorage.getItem('jwt');

  // Add authorization header to every request except login
  if (operation.operationName !== 'LoginUser') {
    operation.setContext({
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : '',
      },
    });
  }

  return forward(operation);
});

const tokenExpirationLink = new ApolloLink((operation, forward) => {
  const jwt = localStorage.getItem('jwt');

  if (jwt && operation.operationName !== 'LoginUser') {
    try {
      const decodedToken = jwtDecode<JwtPayload>(jwt);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('jwt');
        window.location.href = '/login';
        return null;
      }
    } catch (error) {
      console.error('Token validation error:', error);
    }
  }
  return forward(operation);
});


export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([tokenExpirationLink, authLink, httpLink])
});