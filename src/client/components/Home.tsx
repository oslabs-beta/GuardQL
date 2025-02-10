// import React from 'react';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import HomeIcon from '@mui/icons-material/Home';
// import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import BugReportIcon from '@mui/icons-material/BugReport';
// import QueryStatsIcon from '@mui/icons-material/QueryStats';
// import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
// import InfoIcon from '@mui/icons-material/Info';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import Divider from '@mui/material/Divider';
// import './Home.css';
// import Footer from './Footer';
// import * as styles from '../styles/login-and-signup.module.css';
// import logo from '../assets/GuardQL_Logo_R_-_Title2-w_2048px.png';

// const drawerWidth = 240;

// const navItems = [
//   { text: 'Home', icon: <HomeIcon sx={{ color: '#FFFFFF' }} />, link: '/' },
//   { text: 'Dashboard', icon: <SpaceDashboardIcon sx={{ color: '#FFFFFF' }} />, link: '/dashboard' },
//   { text: 'Error Logs', icon: <BugReportIcon sx={{ color: '#FFFFFF' }} />, link: '/logs' },
//   { text: 'Slow Queries', icon: <QueryStatsIcon sx={{ color: '#FFFFFF' }} />, link: '/slow-queries' },
//   { text: 'Performance', icon: <BarChartIcon sx={{ color: '#FFFFFF' }} />, link: '/performance' },
//   { text: 'About', icon: <InfoIcon sx={{ color: '#FFFFFF' }} />, link: '/about' },
//   { text: 'Account', icon: <AccountCircleIcon sx={{ color: '#FFFFFF' }} />, link: '/account' }
// ];

// export default function Home() {
//   return (
//     <div>
//     <Box className="root">
//       <CssBaseline />
//       <AppBar className="app-bar" position="fixed">
//         <Toolbar>
//           <Typography className="header-title" variant="h6">
//             GuardQL
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Drawer className="drawer" variant="permanent" anchor="left">
//         <div className="drawer-header">
//           <img src={logo} alt="GuardQL Logo" className="drawer-logo" />
//         </div>
//         <Divider />
//         <List>
//           {navItems.map(({ text, icon, link }) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton href={link}>
//                 <ListItemIcon>{icon}</ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>

//       <Box component="main" className="main-content">
//         <Toolbar />
//         <Box className="hero-section">
//           <Typography variant="h3" className="hero-title">
//             Welcome to
//           </Typography>
//           <br></br>
//           <img src={logo} alt="GuardQL Logo" className="drawer-logo" />
//           <br></br>
//           <br></br>
//           <Typography className="hero-subtitle">
//             Monitor, debug, and optimize your GraphQL queries with ease.
//           </Typography>
//           <Button className="get-started-btn" href="/#/login" variant="contained">
//             Get Started
//           </Button>
//         </Box>

//         <Box className="features-section">
//           <Typography variant="h4" className="section-title">Why Use GuardQL?</Typography>
          // <Box className="features-grid">
          //   <Box className="feature-card">
          //     <BugReportIcon className="feature-icon" />
          //     <Typography className="feature-text">Error Tracking</Typography>
          //   </Box>
          //   <Box className="feature-card">
          //     <QueryStatsIcon className="feature-icon" />
          //     <Typography className="feature-text">Query Performance</Typography>
          //   </Box>
          //   <Box className="feature-card">
          //     <BarChartIcon className="feature-icon" />
          //     <Typography className="feature-text">Real-Time Monitoring</Typography>
          //   </Box>
          // </Box>
//         </Box>
//       </Box>
//     </Box>
//     <Footer />
//     </div>
//   );
// }


import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import "./Home.css";
import navLogo from '../assets/GuardQL_Text_Only-white.png';
import logo from '../assets/GuardQL_Logo_R3_Title2_512px.png';
import Cindy from '../assets/profilepic-cindy.jpeg';
import Sabrina from '../assets/profilepic-sabrina.jpeg';
import dashboard from '../assets/dashboard.png';
import Footer from './Footer';
import '../styles/footer.module.css';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import BugReportIcon from '@mui/icons-material/BugReport';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';


const teamMembers = [
  { name: "Sienna Shepherd", image: "image1.jpg", linkedin: "", github: "", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { name: "Sabrina Ira", image: Sabrina, linkedin: "https://www.linkedin.com/in/sabrinaira", github: "https://github.com/sabrinaira", bio: "Sabrina is a passionate software engineer with a unique blend of creativity and technical expertise. With a background in art, she brings a fresh perspective to full-stack development, crafting innovative and user-centric applications. Sabrina thrives on understanding the intricacies of software development, constantly honing her skills to deliver optimal solutions and push the boundaries of what technology can achieve." },
  { name: "Nico Henry", image: "image3.jpg", linkedin: "", github: "", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { name: "Mike Thurstlic", image: "image4.jpg", linkedin: "", github: "", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { name: "Cindy Rodríguez-Llivipuma", image: Cindy, linkedin: "https://www.linkedin.com/in/cindy-rod-lliv", github: "https://github.com/csrl23", bio: "Cindy is a full-stack engineer passionate about building tools that empower engineers to work more efficiently. I enjoy solving complex problems, optimizing workflows, and creating intuitive solutions that enhance the development experience." }
];


const App: React.FC = () => {
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
          <li><a href="/#/login" className="dashboard-btn">Dashboard</a></li>
        </ul>
      </nav>
      {/* Hero Section */}
      <section className="hero">
        <img src={logo} alt="GuardQL Logo" className="drawer-logo" />
        <br></br>
        <h2>Monitor, Debug, and Optimize Your GraphQL APIs With Ease</h2>
        <br></br>
        <p>GuardQL helps developers track errors and performance metrics effortlessly</p>
        <br></br>
        <br></br>
        <button className="get-started-btn"><a className="get-started-btn-a" href="/#/login" >Get Started</a></button>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <h2>About GuardQL</h2>
        <br></br>
        <img src={dashboard} alt="Dashboard Image" className="dashboard-image" style={{height:550, width:800}} />
        <br></br>
        <br></br>
        <p className="about-p">GuardQL is a powerful debugging and performance monitoring tool designed to help developers optimize their GraphQL queries.
        With real-time insights, error tracking, and slow query analysis, GuardQL empowers developers to maintain high-performing applications.</p>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <h2>Key Features</h2>
        {/* <br></br> */}
        <div className="features-grid">
          <div className="team-card">
            <BugReportIcon className="feature-icon" />
            <h3 className = "profile-h3">Error Tracking</h3>
            <p className = "profile-title">Identify and analyze GraphQL errors.</p>
          </div>
          <div className="team-card">
            <QueryStatsIcon className="feature-icon" />
            <h3 className = "profile-h3">Error Tracking</h3>
            <p className = "profile-title">Identify and analyze GraphQL errors.</p>
          </div>
          <div className="team-card">
            <MonitorHeartIcon className="feature-icon" />
            <h3 className = "profile-h3">Error Tracking</h3>
            <p className = "profile-title">Identify and analyze GraphQL errors.</p>
          </div>
          <div className="team-card">
            <SpaceDashboardIcon className="feature-icon" />
            <h3 className = "profile-h3">Error Tracking</h3>
            <p className = "profile-title">Identify and analyze GraphQL errors.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section">
        <h2>How It Works</h2>
        <br></br>
        <ol className="howList">
          <li>1. Install the GuardQL NPM package</li>
          <li>2. Add the GuardQL plugin to your Apollo Server configuaration</li>
          <li>3. Log in to your GuardQL dashboard</li>
          <li>4. Select the project you added the GuardQL plugin to, or create a new project and then select it</li>
          <li>5. Run your GraphQL operations and view performance metrics in real-time on your dashboard</li>
          {/* <li>6. Analyze errors & performance metrics</li>
          <li>7. Optimize queries for better efficiency</li> */}
        </ol>
      </section>

      {/* Team Section */}
      <section id="team" className="section">
        <h2>Meet the Team</h2>
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
