import * as styles from '../styles/login-and-signup.module.css';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Login from './Login';
import logo from '../assets/GuardQL_Logo_R_-_Title2-w_2048px.png';
import Footer from './Footer'
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
import { on } from 'events';

/** This is the modified sign up form, edited by Mike, to be consistent with the login page structure */

// type declaration
type FormField = {
  userName: string;
  email: string;
  password: string;
}

function SignUp() {
  const navigate = useNavigate();
  const{ register, handleSubmit, formState: { errors }, reset} = useForm<FormField>();
  /**
   * 
   * "register" is a function provided by the React Hook Form library. Its purpose is to "register" or connect an input field to the form, so that React Hook Form can track its value, handle validation, and manage its state.
   * 
   * 
   *  */ 

  const onSubmit: SubmitHandler<FormField> = (data)=>{
    console.log(data);
    navigate('/dashboard')
    reset();
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <h1>Sign Up for Free!</h1>
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
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <FormControl>
                {/* Username input field */}
                <FormLabel htmlFor='userName' sx={{ color: 'white' }}>
                  Username
                </FormLabel>
                <TextField
                 {...register('userName', { required: 'Username is required' })}
                  autoComplete='userName'
                  name='userName'
                  fullWidth
                  id='userName'
                  placeholder='johnsmith123'
                  variant='standard'
                  error={!!errors.userName}
                  helperText={errors.userName?.message}
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
                 {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please enter a valid email address.',
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                  fullWidth
                  id='email'
                  placeholder='johnsmith@email.com'
                  name='email'
                  autoComplete='email'
                  variant='standard'
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
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long.' } })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                  name='password'
                  placeholder='••••••'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  variant='standard'
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
                  Sign in.
                </Link>
              </Typography>
            </Box>
          </Stack>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
