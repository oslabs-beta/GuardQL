import { SubmitHandler, useForm } from 'react-hook-form'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import Typography from '@mui/material/Typography';
import SignUp from './Sign-Up'
import * as styles from '../styles/login-and-signup.module.css'
import logo from '../assets/GuardQL_Logo_R3_Title2_512px.png'
import Footer from './Footer'

/** This is where the user will finally update their password */

type FormField = {
  newPassword: string;
  confirmPassword: string;
}

function PasswordReset() {
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

      <div className={styles.rightContainer}>

        <div className={styles.loginFormContainer}>
        <Typography
          component='h3'
          variant='h4'>
            Create Password
        </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>

        <TextField className='text-field'
        {...register('newPassword',{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be atleast 6'
          }
        })}
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
        type='password'
        variant='standard'
        fullWidth
        placeholder='New Password'
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
      {...register('confirmPassword', {
        required: 'Password is required',
        minLength: {
          value: 6,
          message: 'Password must be atleast 6'
        }
      })}
      error={!!errors.confirmPassword}
      helperText={errors.confirmPassword?.message}
      type='password'
      placeholder='Confirm New Password'
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

      </form>
      </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default PasswordReset;