import Login from './Login';
import * as styles from './styles/signup.module.css'

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';

const SignUp = () => {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');

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

    if (!userName.value || userName.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Username is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
  };

  return (
    <div>
      <div className={styles.card}>
        <div>
          <Typography
            component='h1'
            variant='h4'
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor='userName'>Username</FormLabel>
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
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='email'>Email</FormLabel>
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
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='password'>Password</FormLabel>
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
          <Divider>
            <Typography>or</Typography>
          </Divider>
          <Box>
            <Typography>
              Already have an account?{' '}
              <Link
                href={'/material-ui/getting-started/templates/sign-in/'}
                variant='body2'
                sx={{ alignSelf: 'center' }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default SignUp;