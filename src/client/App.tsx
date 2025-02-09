import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './lib/apollo';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SignUp from './components/Sign-Up';
import About from './components/About';
import ForgotPassword from './components/ForgotPassword';
import ConfirmationEmail from './components/ConfirmEmail';
import PasswordReset from './components/PasswordReset';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Routes>
          <Route path="/" element={<Home />}/>  
          {/* <Route path="/about" element={<About />}/> */}
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ConfirmEmail" element={< ConfirmationEmail />} />
          <Route path="/PasswordReset" element={< PasswordReset />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
};

export default App;


