import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import Typography from '@mui/material/Typography';  
import * as styles from '../styles/login-and-signup.module.css'
import logo from '../assets/GuardQL_Logo_R_-_Title2-w_2048px.png'
import Footer from './Footer'

/** This is where the user will be redirected to if they forgot their password.
 * They will be expected to input their email address of thier account
 * and then hit the submit button to send the reset link to their inbox
 */

type FormField = {
  email: string;
}

function ForgotPassword(){
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset} = useForm<FormField>();

  const onSubmit: SubmitHandler<FormField> = (data)=>{
    console.log(data);
    navigate('/ConfirmEmail')
    reset();
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.rightContainer}>
          <div className={styles.loginFormContainer}>
            <Typography component='h3' variant='h4'>Please Submit</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
            <TextField className='text-field'
              {...register('email',{
                required: 'Email is required',
                minLength: {
                  value: 6,
                  message: ' provide a valid email'
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              type='text'
              variant='standard'
              fullWidth
              placeholder='Email'
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
            <p> An email shall be sent to reset password</p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default ForgotPassword;



    
