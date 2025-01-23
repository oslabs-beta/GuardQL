import { SubmitHandler, useForm } from 'react-hook-form'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
// import './styles/login.css'
import SignUp from './Sign-Up'
import * as styles from '../styles/login-and-signup.module.css'
import logo from '../assets/GuardQL_Logo_R_-_Title2-w_2048px.png'

type FormField = {
  user: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const{ register, handleSubmit, formState: { errors }, reset} = useForm<FormField>();

  const onSubmit: SubmitHandler<FormField> = (data)=>{
    console.log(data);
    navigate('/dashboard')
    reset();
  }

  return (
    <div className={styles.background}>
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <h1>This is Happening!</h1>
      <img src ={logo}
          alt='GuardQL Logo'
          style={{ width: '400px', height: 'auto' }} />
      </div>

      <div className={styles.rightContainer}>

        <div className={styles.loginFormContainer}>
      <h3>Sign In</h3>
      <form onSubmit={handleSubmit(onSubmit)}>

        <TextField className='text-field'
        {...register('user')}
        type='text'
        variant='standard'
        fullWidth
        placeholder='User Name'
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
      {...register('password')}
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

      <p className="text-center text-white mt-4">
              Don't have an account?{' '}
              <Link to="/signup"
              style={{ color: '#D5006D', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#F50057'}
              onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#D5006D'}
              >
                Sign up here
              </Link>
            </p>

      </form>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Login;
