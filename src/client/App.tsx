import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo';
import Home from './components/Home';
import Navbar from './components/Dashboard';
import Docs from './components/Docs';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SignUp from './components/Sign-Up';
import About from './components/About';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Routes>
          <Route path="/" element={<About />}/>  
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
};

export default App;