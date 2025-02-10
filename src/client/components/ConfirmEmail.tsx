import { SubmitHandler, useForm } from 'react-hook-form'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import Typography from '@mui/material/Typography';
import SignUp from './Sign-Up'
import * as styles from '../styles/login-and-signup.module.css'
import logo from '../assets/GuardQL_Logo_R3_Title2_512px.png'
import Footer from './Footer'

/** This is after the user hits the submit button to send the reset password link to their inbox */

type FormField = {
  user: string;
  password: string;
}

function ConfirmationEmail() {


  return (
    <div className={styles.background}>
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <h1>An Email has been sent to your Account.</h1>
      <img src ={logo}
          alt='GuardQL Logo'
          style={{ width: '300px', height: 'auto' }} />

<p className="text-center text-white">
              Click Here to {' '}
              <Link to="/login"
              style={{ color: '#FFC0CB', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#F50057'}
              onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#FFC0CB'}
              >
                Log In
              </Link>
            </p>


      </div>
  </div>
  <Footer />
  </div>
     )
     }

export default ConfirmationEmail;