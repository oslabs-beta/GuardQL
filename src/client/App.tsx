import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo';
import Home from './components/Home';
import Navbar from './components/Dashboard';
import Docs from './components/Docs';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import ConfirmEmail from './components/ConfirmEmail';
import PasswordReset from './components/PasswordReset';
// import SignUp from './components/Sign-Up';
import SignUp from './components/SignUp-react-form';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Routes>
          <Route path="/" element={<Login />}/>  
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ConfirmEmail" element={< ConfirmEmail />} />
          <Route path="/PasswordReset" element={< PasswordReset />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
};

export default App;