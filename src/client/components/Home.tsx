import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import './Home.css';
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

export default function Home() {
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
      
      <Drawer className="drawer" variant="permanent" anchor="left">
        <div className="drawer-header">
          <img src={logo} alt="GuardQL Logo" className="drawer-logo" />
        </div>
        <Divider />
        <List>
          {navItems.map(({ text, icon, link }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton href={link}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      
      <Box component="main" className="main-content">
        <Toolbar />
        <Box className="hero-section">
          <Typography variant="h3" className="hero-title">
            Welcome to GuardQL
          </Typography>
          <Typography className="hero-subtitle">
            Monitor, debug, and optimize your GraphQL queries with ease.
          </Typography>
          <Button className="get-started-btn" href="/dashboard" variant="contained">
            Get Started
          </Button>
        </Box>
        
        <Box className="features-section">
          <Typography variant="h4" className="section-title">Why Use GuardQL?</Typography>
          <Box className="features-grid">
            <Box className="feature-card">
              <BugReportIcon className="feature-icon" />
              <Typography className="feature-text">Error Tracking</Typography>
            </Box>
            <Box className="feature-card">
              <QueryStatsIcon className="feature-icon" />
              <Typography className="feature-text">Query Performance</Typography>
            </Box>
            <Box className="feature-card">
              <BarChartIcon className="feature-icon" />
              <Typography className="feature-text">Real-Time Monitoring</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}