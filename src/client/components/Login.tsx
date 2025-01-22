import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, TextField } from '@mui/material'
import './login.css'

type FormField = {
  email: string;
  password: string;
}

function Login() {
  const{ register, handleSubmit, formState: { errors }, reset} = useForm<FormField>();

  const onSubmit: SubmitHandler<FormField> = (data)=>{
    console.log(data);
    reset();
  }
  

  return (
    <>
    <div className='container'>
      <div className='leftContainer'>
        <h1>This is Happening!</h1>
      <img src ='./GuardQL_Logo_R_-_Title2-w_2048px.png' 
          style={{ width: '400px', height: 'auto' }} />
      </div>

      <div className='rightContainer'>

        <div className='formContainer'>
      <h3>Sign In</h3>
      <form onSubmit={handleSubmit(onSubmit)}>

        <TextField className='text-field'
        {...register('email')} 
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
              <a href="/signup"
              style={{ color: '#D5006D', textDecoration: 'none' }} 
              onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#F50057'} 
              onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#D5006D'}
              >
                Sign up here
              </a>
            </p>

      </form>
      </div>
      </div>
      </div>
    </>
  )
}

export default Login;
