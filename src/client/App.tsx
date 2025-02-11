import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './requests/apollo';
import Login from './components/Login';
import SignUp from './components/Sign-Up';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import ConfirmationEmail from './components/ConfirmEmail';
import PasswordReset from './components/PasswordReset';
import Dashboard from './components/Dashboard';
import Performance from './components/Performance';
// import About from './components/About';
// import Account from './components/Account';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Routes>
          <Route path="/" element={<Home />}/> 
          <Route path="/home" element={<Home />}/> 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/performance" element={<Performance />} />
          {/* <Route path="/about" element={<About />}/> */}
          {/* <Route path="/account" element={<Account />} /> */}
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ConfirmEmail" element={< ConfirmationEmail />} />
          <Route path="/PasswordReset" element={< PasswordReset />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
};

export default App;


