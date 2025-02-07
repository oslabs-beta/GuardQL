import { SubmitHandler, useForm } from 'react-hook-form'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import Typography from '@mui/material/Typography';
import * as styles from '../styles/login-and-signup.module.css'
import logo from '../assets/GuardQL_Logo_R_-_Title2-w_2048px.png'
import Footer from './Footer'
import { LOGIN } from './ProjectData'; 
import { useMutation } from '@apollo/client'; 
import SignUp from './Sign-Up'

/** type declaration */
type FormField = {
  user: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const{ register, handleSubmit, formState: { errors }, reset} = useForm<FormField>();
  const [login, { loading: mutationLoading, error: mutationError }] = useMutation(LOGIN); 
  // console.log('Data returned from loggingIn begins here:', data); 

  
  const onSubmit: SubmitHandler<FormField> = async (userInput) => {
    try {
      const { data } = await login({ 
        variables: { 
          input: {
            username: userInput.user, 
            password: userInput.password
          }
        }
      }); 
      // console.log('data begins here:', data); 
      // console.log('Input data begins here:', userInput);

      const token = data.login.token; 
      localStorage.setItem('jwt', token); 
      console.log('Local storage begins here:', localStorage.setItem); 
      // console.log('This is the user\'s token:', token); 

      navigate('/dashboard')
      reset();

    } catch (error) {
      // console.log('useMutation not successful, error begins here:', error); 
    }
    // const { data } = await login({ 
    //   variables: { 
    //     input: {
    //       username: userInput.user, 
    //       password: userInput.password
    //     }
    //   }
    // }); 


    // if (mutationLoading) return 'Verifying user...'; 
    // if (mutationError) return `Login error: ${mutationError.message}`; 

    // if (data) console.log('User not found in the database'); 
    // if (data!) console.log('User has been logged in successfully!'); 

  }

  return (
    <div className={styles.background}>
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <h1>Uncover, Analyze, and Optimize Your GraphQL Performance.</h1>
      <img src ={logo}
          alt='GuardQL Logo'
          style={{ width: '400px', height: 'auto' }} />
      </div>

      <div className={styles.rightContainer}>

        <div className={styles.loginFormContainer}>
        <Typography
          component='h3'
          variant='h4'>
            Sign In
        </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>

        <TextField className='text-field'
        {...register('user',{
          required: 'Username is required',
          minLength: {
            value: 6,
            message: 'Username must be atleast 6'
          }
        })}
        error={!!errors.user}
        helperText={errors.user?.message}
        type='text'
        variant='standard'
        fullWidth
        placeholder='Username'
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

      <TextField
      className='text-field'
      {...register('password', {
        required: 'Password is required',
        minLength: {
          value: 6,
          message: 'Password must be atleast 6'
        }
      })}
      error={!!errors.password}
      helperText={errors.password?.message}
      type='password'
      placeholder='Password'
      variant='standard'
      fullWidth
      sx={{

        '& .MuiInputBase-root': {
          color: 'white',
        },
        '& .MuiInput-underline:before': {
          borderBottomColor: 'white',
        },
        '& .MuiInput-underline:hover:before': {
          borderBottomColor: 'white',
        },
        marginBottom: '15px'
      }}
      />

      <Button
      type='submit'
      variant='contained'
      className='submitButton'
      fullWidth
      sx={{
        backgroundColor: 'hotpink',
        '&:hover': {
          backgroundColor: 'deeppink',
        },
        marginTop: '15px',
      }}
      >
        Enter
      </Button>

      <p className="text-center text-white">
              Don't have an account:{' '}
              <Link to="/signup"
              style={{ color: '#FFC0CB', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#F50057'}
              onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#FFC0CB'}
              >
                Sign Up
              </Link>
            </p>
            <p className="text-center text-white" style={{ marginTop: '-15px' }}>
              Forgotten Password:{' '}
              <Link to="/ForgotPassword"
              style={{ color: '#FF77A8', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#F50057'}
              onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#FF77A8'}
              >
                Reset Here
              </Link>
            </p>
      </form>
      </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login;
