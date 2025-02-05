import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import './About.css';
import logo from '../assets/GuardQL_Logo_R_-_Title2-w_2048px.png';

const drawerWidth = 240;

const navItems = [
  { text: 'Home', icon: <HomeIcon sx={{ color: '#FFFFFF' }} />, link: '/' },
  { text: 'Dashboard', icon: <SpaceDashboardIcon sx={{ color: '#FFFFFF' }} />, link: '/dashboard' },
  { text: 'Error Logs', icon: <BugReportIcon sx={{ color: '#FFFFFF' }} />, link: '/logs' },
  { text: 'Slow Queries', icon: <QueryStatsIcon sx={{ color: '#FFFFFF' }} />, link: '/slow-queries' },
  { text: 'Performance', icon: <BarChartIcon sx={{ color: '#FFFFFF' }} />, link: '/performance' },
  { text: 'About', icon: <InfoIcon sx={{ color: '#FFFFFF' }} />, link: '/about' },
  { text: 'Account', icon: <AccountCircleIcon sx={{ color: '#FFFFFF' }} />, link: '/account' }
];

export default function About() {
  return (
    <Box className="root">
      <CssBaseline />
      <AppBar className="app-bar" position="fixed">
        <Toolbar>
          <Typography className="header-title" variant="h6">
            GuardQL
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer 
        className="drawer"
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#121212',
            borderRight: '1px solid rgba(255, 255, 255, 0.12)'
          },
        }}
      >
        <div className="drawer-header">
          <img src={logo} alt="GuardQL Logo" className="drawer-logo" />
        </div>
        <Divider />
        <List>
          {navItems.map(({ text, icon, link }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton href={link}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} sx={{ color: '#FFFFFF' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      
      <Box component="main" className="main-content">
        <Toolbar />
        <Box className="content-container">
          <Box className="about-section">
            <Typography variant="h3" className="section-title">
              About GuardQL
            </Typography>
            <Typography className="section-text">
              GuardQL is a powerful debugging and performance monitoring tool designed to help developers optimize their GraphQL queries. 
              With real-time insights, error tracking, and slow query analysis, GuardQL empowers developers to maintain high-performing applications.
            </Typography>
          </Box>
          
          <Box className="features-section">
            <Typography variant="h4" className="section-title">
              What GuardQL Offers
            </Typography>
            <ul className="features-list">
              <li>✅ Error Tracking - Identify and analyze GraphQL errors.</li>
              <li>🚀 Performance Insights - Measure query execution time.</li>
              <li>📊 Real-Time Monitoring - Stay updated with live query metrics.</li>
              <li>🛠 Developer-Friendly - Simple UI, easy debugging.</li>
            </ul>
          </Box>
          
          <Box className="how-it-works section">
            <Typography variant="h4" className="section-title">
              How It Works
            </Typography>
            <Box className="section-text">
              <Typography component="div" className="centered-steps">
                1. Connect GuardQL to your GraphQL API<br />
                2. View logs in real-time<br />
                3. Analyze errors & performance metrics<br />
                4. Optimize queries for better efficiency
              </Typography>
            </Box>
          </Box>
          
          <Box className="team-section section">
            <Typography variant="h4" className="section-title">
              Meet the Team
            </Typography>
            <Typography className="section-text">
              Placeholder.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}