import * as styles from '../styles/login-and-signup.module.css';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import logo from '../assets/GuardQL_Logo_R3_Title2_512px.png';
import Footer from './Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CREATE_ACCOUNT } from '../requests/gqlQueries';
import ApiKeyDialog from './ApiKeyDialog';

/** This is Sabrina's original Sign-Up component */

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
  Container, 
} from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});


const SignUp = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [ createAccountSuccess, setCreateAccountSuccess ] = useState<string | null>(null);
  const [ createAccountError, setCreateAccountError ] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const navigate = useNavigate();

  const [signup, { loading, error, data }] = useMutation(CREATE_ACCOUNT);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userInput = new FormData(event.currentTarget);

    const username = userInput.get('userName')?.toString() || '';
    const password = userInput.get('password')?.toString() || '';
    const email = userInput.get('email')?.toString() || '';

    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!username || username.length < 4) {
      setNameError(true);
      setNameErrorMessage('Username is required');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (!isValid) return;

    try {
      const { data } = await signup({
        variables: {
          input: {
            username,
            password,
            email,
          },
        },
      });
      // console.log('This is the data returned from the signup:', data); 

      if (data.createUser.code === 409) {
        setCreateAccountError(data.createUser.message);
      } else if (data.createUser.code === 200) {
        setApiKey(data.createUser.apiKey);
        setShowApiKey(true);
        setCreateAccountSuccess(data.createUser.message);

      } else if (data.createUser.code === 500) {
        // console.log('Account creation was unsuccessful (500)'); 
        setCreateAccountError(data.createUser.message);
      }
      // console.log('Registration successful:', data);
      // console.log('This is the returned code:', data.createUser.code);
      // console.log('This is the returned message:', data.createUser.message);
    } catch (error) {
      // console.error('Error during registration:', error);
      setCreateAccountError('Account creation was unsuccessful');
    }
  };

  const handleApiKeyDialogClose = () => {
    setShowApiKey(false);
    navigate('/login');
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <ThemeProvider theme={theme}>
        <div className={styles.leftContainer}>
          <h1>Uncover, Analyze, and Optimize Your GraphQL Performance</h1>
          <br></br>
          <Link to={'/home'}><img src ={logo} alt='GuardQL Logo' style={{ width: '400px', height: 'auto' }} /></Link>
        </div>
        <div className={styles.rightContainer}>
          <Stack className={styles.signUpFormContainer}>
            <Typography component='h3' variant='h4'>Sign Up</Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                  placeholder='developer123'
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
                  placeholder='developer@email.com'
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
                  placeholder='••••••••••••'
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
                // onClick={handleSubmit}
                sx={{
                  backgroundColor: '#e623c6',
                  '&:hover': {
                    backgroundColor: '#e263cd',
                  },
                  marginTop: '15px',
                }}
              >
                Create Account
              </Button>
              {/* {createAccountError && (<p style={{ color: 'red', marginTop: "10px" }}>{createAccountError}</p>)}
              {createAccountSuccess && (<p style={{ color: '#e623c6', marginTop: "10px" }}>{createAccountSuccess}</p>)} */}
            </Box>
            <Divider></Divider>
            <Box>
              <Typography>
                Already have an account? {/* Clicking on the Sign In link */}
                <Link to='/login' style={{ color: '#e623c6', textDecoration: 'none' }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLAnchorElement).style.color = '#e263cd')
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLAnchorElement).style.color = '#e623c6')
                  }
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Stack>



          <ApiKeyDialog
            open={showApiKey}
            apiKey={apiKey}
            onClose={handleApiKeyDialogClose}
          />



        </div>
        </ThemeProvider>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;