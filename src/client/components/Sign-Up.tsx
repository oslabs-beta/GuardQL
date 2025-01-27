import * as styles from '../styles/login-and-signup.module.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Login from './Login';
import logo from '../assets/GuardQL_Logo_R_-_Title2-w_2048px.png';

/** Material UI Components */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Stack,
  Divider,
} from '@mui/material';

// const REGISTER_MUTATION = gql`
//   mutation Register($input: RegisterInput!) {
//     register(input: $input) {
//       token
//       user {
//         id
//         username
//         email
//         password
//       }
//     }
//   }
// `;

const SignUp = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  // const [register, { loading, error, data }] = useMutation(REGISTER_MUTATION);

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const userName = document.getElementById('userName') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!userName.value || userName.value.length < 4) {
      setNameError(true);
      setNameErrorMessage('Username is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (nameError || emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      userName: data.get('userName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    });

    const formData = new FormData(event.currentTarget);
    const username = formData.get('userName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // try {
    //   const { data } = await register({
    //     variables: {
    //       input: {
    //         username,
    //         email,
    //         password,
    //       },
    //     },
    //   });

    //   console.log('Registration successful:', data);
    //   // Redirect the user or show a success message
    // } catch (err) {
    //   console.error('Error during registration:', err);
    // }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <h1>This is the Sign Up page!</h1>
          <img
            src={logo}
            alt='GuardQL Logo'
            style={{ width: '400px', height: 'auto' }}
          />
        </div>

        <div className={styles.rightContainer}>
          <Stack className={styles.signUpFormContainer}>
            <Typography component='h3' variant='h4'>
              Sign up
            </Typography>
            <Box
              component='form'
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <FormControl>
                {/* Username input field */}
                <FormLabel htmlFor='userName' sx={{ color: 'white' }}>
                  Username
                </FormLabel>
                <TextField
                  autoComplete='userName'
                  name='userName'
                  required
                  fullWidth
                  id='userName'
                  placeholder='johnsmith123'
                  variant='standard'
                  error={nameError}
                  helperText={nameErrorMessage}
                  color={nameError ? 'error' : 'primary'}
                  sx={{
                    '& .MuiInputBase-root': {
                      color: 'white',
                    },
                    '& .MuiInput-underline:before': {
                      borderBottomColor: 'white', // Underline color
                    },
                    '& .MuiInput-underline:hover:before': {
                      borderBottomColor: 'white',
                    },
                    marginBottom: '15px',
                  }}
                />
              </FormControl>
              <FormControl>
                {/* Email input field */}
                <FormLabel htmlFor='email' sx={{ color: 'white' }}>
                  Email
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  id='email'
                  placeholder='johnsmith@email.com'
                  name='email'
                  autoComplete='email'
                  variant='standard'
                  error={emailError}
                  helperText={emailErrorMessage}
                  color={passwordError ? 'error' : 'primary'}
                  sx={{
                    '& .MuiInputBase-root': {
                      color: 'white',
                    },
                    '& .MuiInput-underline:before': {
                      borderBottomColor: 'white', // Underline color
                    },
                    '& .MuiInput-underline:hover:before': {
                      borderBottomColor: 'white',
                    },
                    marginBottom: '15px',
                  }}
                />
              </FormControl>
              <FormControl>
                {/* Password input field */}
                <FormLabel htmlFor='password' sx={{ color: 'white' }}>
                  Password
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  name='password'
                  placeholder='••••••'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  variant='standard'
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? 'error' : 'primary'}
                  sx={{
                    '& .MuiInputBase-root': {
                      color: 'white',
                    },
                    '& .MuiInput-underline:before': {
                      borderBottomColor: 'white', // Underline color
                    },
                    '& .MuiInput-underline:hover:before': {
                      borderBottomColor: 'white',
                    },
                    marginBottom: '15px',
                  }}
                />
              </FormControl>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                onClick={validateInputs}
                sx={{
                  backgroundColor: 'hotpink',
                  '&:hover': {
                    backgroundColor: 'deeppink',
                  },
                  marginTop: '15px',
                }}
              >
                Sign up
              </Button>
            </Box>
            <Divider></Divider>
            <Box>
              <Typography>
                Already have an account? {/* Clicking on the Sign In link */}
                <Link
                  to='/login'
                  style={{ color: '#D5006D', textDecoration: 'none' }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLAnchorElement).style.color = '#F50057')
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLAnchorElement).style.color = '#D5006D')
                  }
                >
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
