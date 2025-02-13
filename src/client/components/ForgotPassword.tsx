import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import Typography from '@mui/material/Typography';  
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as styles from '../styles/login-and-signup.module.css'
import logo from '../assets/GuardQL_Logo_R3_Title2_512px.png';
import Footer from './Footer'

/** This is where the user will be redirected to if they forgot their password.
 * They will be expected to input their email address of thier account
 * and then hit the submit button to send the reset link to their inbox
 */

type FormField = {
  email: string;
}

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

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
        <ThemeProvider theme={theme}>
          <div className={styles.leftContainer}>
            <h1>Uncover, Analyze, and Optimize Your GraphQL Performance</h1>
            <br></br>
            <Link to={'/home'}><img src ={logo} alt='GuardQL Logo' style={{ width: '400px', height: 'auto' }} /></Link>
          </div>
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
                backgroundColor: '#e623c6',
                '&:hover': {
                  backgroundColor: '#e263cd',
                },
                marginTop: '15px',
              }}
            >
            Enter
            </Button>
            <br></br>
            <br></br>
            <p> An email will be sent to reset your password</p>
            </form>
            </div>
          </div>
        </ThemeProvider>
      </div>
      <Footer />
    </div>
  )
}
export default ForgotPassword;



    
