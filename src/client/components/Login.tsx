import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as styles from '../styles/login-and-signup.module.css';
import logo from '../assets/GuardQL_Logo_R_-_Title2-w_2048px.png';
import Footer from './Footer';
import { LOGIN } from './ProjectData'; 
import { useMutation } from '@apollo/client'; 
import SignUp from './Sign-Up';

/** type declaration */
type FormField = {
  user: string;
  password: string;
}

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset} = useForm<FormField>();
  const [ loginError, setLoginError ] = useState<string | null>(null); 
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
      // console.log('data from login.tsx begins here:', data); 
      // console.log('Input data from login.tsx begins here:', userInput);

      const token = data.login.token; 
      localStorage.setItem('jwt', token); 
      setLoginError(null); 
      // console.log('Local storage begins here:', localStorage); 
      // console.log('This is the user\'s token:', token); 
      navigate('/dashboard')
      reset();

    } catch (error) {
      console.log('useMutation not successful, error begins here:', error); 
      setLoginError('Username or password incorrect'); 
    }
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <ThemeProvider theme={theme}>
        <div className={styles.leftContainer}>
          <h1>Uncover, Analyze, and Optimize Your GraphQL Performance</h1>
          <br></br>
          <img src ={logo} alt='GuardQL Logo' style={{ width: '400px', height: 'auto' }} />
        </div>
        <div className={styles.rightContainer}>

        <div className={styles.loginFormContainer}>
          <Typography component='h3' variant='h4'>Sign In</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
          <TextField className='text-field'
            {...register('user',{
              required: 'Username is required',
              minLength: {
                value: 6,
                message: 'Username must be at least 6 characters long'
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
          <TextField className='text-field'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long'
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
          {/* {loginError && <p style={{ color: 'red' }}>{loginError}</p>} */}
          <Button type='submit' variant='contained' className='submitButton' fullWidth
            sx={{
              backgroundColor: '#e623c6',
              '&:hover': {
                backgroundColor: '#e263cd',
              },
              marginTop: '15px',
              marginBottom: "10px",
            }}
          >Sign In
          </Button>
          {loginError && (<p style={{ color: 'red', marginTop: "10px" }}>{loginError}</p>)}
          <br></br>
          <br></br>
          <p className="text-center">Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#e623c6', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#e263cd'}
              onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#e623c6'}
            >
            Sign Up
            </Link>
          </p>
          <br></br>
          <p className="text-center" style={{ marginTop: '-15px' }}>Forgot password?{' '}
            <Link to="/ForgotPassword" style={{ color: '#e623c6', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#e263cd'}
              onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#e623c6'}
            >
            Reset Password
            </Link>
          </p>
          </form>
        </div>
      </div>
      </ThemeProvider>
      </div>
      <Footer />
    </div>
  )
}

export default Login;
