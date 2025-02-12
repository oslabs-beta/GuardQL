import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { JwtPayload } from '../requests/apollo'; 


import { FaLinkedin, FaGithub } from "react-icons/fa";
import BugReportIcon from '@mui/icons-material/BugReport';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { ArrowRight, GitBranch, AlertCircle, BarChart3, Server, Code2 } from 'lucide-react';

import navLogo from '../assets/GuardQL_Text_Only-white.png';
import logo from '../assets/GuardQL_Logo_R3_Title2_512px.png';
import dashboard from '../assets/dashboard.png';
import Cindy from '../assets/profilepic-cindy.jpeg';
import Sabrina from '../assets/profilepic-sabrina.jpeg';
import Sienna from '../assets/profilepic-sienna.jpeg';
import Mike from '../assets/profilepic-mike.jpeg';
import Nico from '../assets/profilepic-nico.jpeg';

import Footer from './Footer';
import '../styles/footer.module.css';
import "../styles/home.css";
import PluginFlow from './PluginFlow'; 

const App: React.FC = () => {

  const teamMembers = [
    { name: "Sienna Shepherd", image: Sienna, linkedin: "https://www.linkedin.com/in/sienna-shepherd/", github: "https://github.com/codecaptaincode", bio: "Sienna is a detail-oriented software engineer passionate about solving complex problems and bringing ideas to life through code. Specializing in full-stack development, she builds intuitive, user-friendly applications that make a meaningful impact. When she’s not coding, you’ll likely find her discovering new music, getting lost in a good book or video game, and exploring NYC’s hidden gems." },
    { name: "Sabrina Ira", image: Sabrina, linkedin: "https://www.linkedin.com/in/sabrinaira", github: "https://github.com/sabrinaira", bio: "Sabrina is a passionate software engineer with a unique blend of creativity and technical expertise. With a background in art, she brings a fresh perspective to full-stack development, crafting innovative and user-centric applications. Sabrina thrives on understanding the intricacies of software development, constantly honing her skills to deliver optimal solutions and push the boundaries of what technology can achieve." },
    { name: "Nico Henry", image: Nico, linkedin: "https://www.linkedin.com/in/nico-henry/", github: "https://github.com/Nico21221", bio: "Hi i’m Nico Henry, a full-stack developer in New York City who’s passionate about solving problems by building dynamic web apps. I bring together my technical skills, leadership experience, and a user-first mindset to create meaningful solutions. When I’m not coding, you’ll find me lifting weights or experimenting with new recipes." },
    { name: "Mike Thurstlic", image: Mike, linkedin: "https://www.linkedin.com/in/mike-thurstlic-a2b8a82a4/", github: "https://github.com/thurstlic7", bio: "Mike Thurstlic is a frontend developer and is proud to be a member of the GuardQL team. He lives in NYC." },
    { name: "Cindy Rodríguez-Llivipuma", image: Cindy, linkedin: "https://www.linkedin.com/in/cindy-rod-lliv", github: "https://github.com/csrl23", bio: "Cindy is a full-stack engineer passionate about building tools that empower engineers to work more efficiently. I enjoy solving complex problems, optimizing workflows, and creating intuitive solutions that enhance the development experience." }
  ];

  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const jwt = localStorage.getItem('jwt');
    
    if (jwt) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(jwt);
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (decodedToken.exp > currentTime) {
          // Token is valid, go to dashboard
          navigate('/dashboard');
        } else {
          // Token is expired, remove it and go to login
          localStorage.removeItem('jwt');
          navigate('/login');
        }
      } catch (error) {
        // Token is invalid, go to login
        navigate('/login');
      }
    } else {
      // No token, go to login
      navigate('/login');
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo" onClick={() => scroll.scrollToTop()}>
          <img src={navLogo} alt="GuardQL Logo" className="nav-logo" style={{height:50, width:200}} />
        </h1>
        <ul>
          <li><Link to="about" smooth={true} duration={500}>About</Link></li>
          <li><Link to="features" smooth={true} duration={500}>Features</Link></li>
          <li><Link to="how-it-works" smooth={true} duration={500}>How It Works</Link></li>
          <li><Link to="team" smooth={true} duration={500}>Team</Link></li>
          <li><a href="https://github.com/oslabs-beta/GuardQL">GitHub</a></li>
          <li><a href="#" className="dashboard-btn" onClick={handleNavClick}>Dashboard</a></li>
        </ul>
      </nav>
      {/* Hero Section */}
      <section className="hero">
        <img src={logo} alt="GuardQL Logo" className="drawer-logo" style={{height: 280}}/>
        <br></br>
        <h2>Monitor, Debug, and Optimize Your GraphQL APIs With Ease</h2>
        <br></br>
        <p>GuardQL helps developers track errors and performance metrics effortlessly</p>
        <br></br>
        <br></br>
        <button className="get-started-btn"><a className="get-started-btn-a" href="#" onClick={handleNavClick}>Get Started</a></button>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <h2 className="homepage-h2">About GuardQL</h2>
        <br></br>
        <img src={dashboard} alt="Dashboard Image" className="dashboard-image" style={{height:550, width:800}} />
        <br></br>
        <br></br>
        <p className="about-p">GuardQL is a powerful debugging and performance monitoring tool designed to help developers optimize their GraphQL queries.
        With real-time insights, error tracking, and slow query analysis, GuardQL empowers developers to maintain high-performing applications.</p>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <h2 className="homepage-h2">Key Features</h2>
        <br></br>
        <div className="team-container">
          <div className="feature-card">
            <BugReportIcon className="feature-icon" />
            <h3 className = "profile-h3">GraphQL Error Logging & Debugging</h3>
            <h4 className = "features-h4">Real-time Error Capture</h4>
            <p className = "features-p">Logs GraphQL API errors with timestamps and detailed error messages</p>
            <h4 className = "features-h4">Stack Trace & Code Context</h4>
            <p className = "features-p">Displays the specific GraphQL query/mutation that caused the error</p>
          </div>
          <div className="feature-card">
            <QueryStatsIcon className="feature-icon" />
            <h3 className = "profile-h3">Performance Monitoring & Query Analysis</h3>
            <h4 className = "features-h4">Slow Query Detection</h4>
            <p className = "features-p">Flags GraphQL queries that exceed a specified execution time</p>
            <h4 className = "features-h4">General Query Performance Tracking</h4>
            <p className = "features-p">Logs execution times for all queries, not just slow ones, to provide a complete performance overview</p>
          </div>
          <div className="feature-card">
            <SpaceDashboardIcon className="feature-icon" />
            <h3 className = "profile-h3">Intuitive Dashboard</h3>
            <h4 className = "features-h4">Clean, User-Friendly UI</h4>
            <p className = "features-p">Designed for quick debugging and troubleshooting</p>
            <h4 className = "features-h4">Graphical Performance Reports</h4>
            <p className = "features-p">Displays query performance trends over time</p>
          </div>
          <div className="feature-card">
            <SettingsInputHdmiIcon className="feature-icon" />
            <h3 className = "profile-h3">Seamless Integration & NPM Plugin</h3>
            <h4 className = "features-h4">Easy-to-Install NPM Package</h4>
            <p className = "features-p">A lightweight plugin that integrates into any GraphQL project with minimal setup</p>
            <h4 className = "features-h4">Automatic Error & Performance Logging</h4>
            <p className = "features-p">Requires little configuration to start capturing insights</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section">
        <h2 className="homepage-h2">How It Works</h2>
        <br></br>
        <PluginFlow></PluginFlow>
      </section>

      {/* Team Section */}
      <section id="team" className="section">
        <h2 className="homepage-h2">Meet the Team</h2>
        <br></br>
        <p>GuardQL was built by passionate engineers dedicated to making debugging easier for developers.</p>
        <br></br>
        <div className="team-container">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-image"><img src={member.image} alt={member.name} className="profile-pic" /></div>
              <h3 className = "profile-h3">{member.name}</h3>
              <p className = "profile-title">Software Engineer</p>
              <div className="social-links">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin">
                  <FaLinkedin size={24} />
                </a>
                <a href={member.github} target="_blank" rel="noopener noreferrer" className="github">
                  <FaGithub size={24} />
                </a>
              </div>
              <p className = "profile-p">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
