import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export interface JwtPayload {
  exp: number; 
  [key: string]: any; 
}

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

const authLink = new ApolloLink((operation, forward) => {
  // console.log('Operation name begins here:', operation.operationName); 
  // console.log('Operation variables begins here:', operation.variables); 
    if (operation.operationName === 'LoginUser') {
      // console.log('Login request is being sent'); 
      return forward(operation); 
    }

    const jwt = localStorage.getItem('jwt'); 

    if (jwt) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(jwt); 
        const currentTime = Math.floor(Date.now() / 1000); 

        // const navigate = useNavigate();

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('jwt'); 
          window.location.href = '/login'; 
          // navigate('/login');
        }
      } catch (error) {
        console.error('Token validation error:', error); 
      }
    }

    return forward(operation); 
}); 

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', 
  cache: new InMemoryCache(), 
  link: ApolloLink.from([authLink, httpLink])
});