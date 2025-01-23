import React from "react";
import NavBar from "./NavBar"
import DisplayError from "./DisplayError";
import Performance from "./Performance";
import Projects from "./Projects";

const Dashboard = () => {

  return (
    <div>
      <NavBar />
      <h1 style={{ color: 'white', textAlign: 'center'}}>DASHBOARD TIME!</h1>
    </div>
  )
};

export default Dashboard;