import React from 'react';
import Home from "./components/Home"
import Navbar from './components/NavBar';
import Docs from './components/Docs';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Heading } from "@chakra-ui/react"

const App = () => {
  return (
    // <div>
    //   <h1>Hello App</h1>
    //   {/* <insert other components> */}
    // <Navbar />
    // <Home />
    // </div>
    <div>
    <Heading>Hello World!</Heading>
    <Dashboard />
    </div>
  );
};

export default App;