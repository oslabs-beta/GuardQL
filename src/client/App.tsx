import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/NavBar';
import Docs from './components/Docs';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SignUp from './components/Sign-Up';

const App = () => {
  return (

    <div>
      <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<SignUp />} />

     <Route path="/dashboard" element={<Dashboard />} />
     </Routes>
    </div>
  );
};

export default App;
