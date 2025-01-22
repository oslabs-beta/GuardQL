import React from 'react';
import Home from './components/Home';
import Navbar from './components/NavBar';
import Docs from './components/Docs';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    // <div>
    //   <h1>Hello App</h1>
    //   {/* <insert other components> */}
    // <Navbar />
    // <Home />
    // </div>
    <div>
      <Login/>
      <Dashboard />
      <h1>Hi</h1>
    </div>
  );
};

export default App;
