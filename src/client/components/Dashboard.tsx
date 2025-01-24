import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import './Dashboard.css';
<<<<<<< HEAD
import logo from '../assets/GuardQL_Logo_R_-_Title2-w_2048px.png'


=======
>>>>>>> 10a793f (nothing of note)

const drawerWidth = 240;

export default function NavBar() {
  return (
    <Box className="root">
      <CssBaseline />
      <AppBar className="app-bar" position="fixed">
        <Toolbar>
          <Typography className="header-title" variant="h6">
            GuardQL Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer className="drawer" variant="permanent" anchor="left">
        <div className="drawer-header">
          <img 
            src={logo}
            alt="GuardQL Logo"
            className="drawer-logo"
          />
        </div>
        <Divider />
        <List>
          {[
            { text: 'Dashboard', icon: <DashboardIcon sx={{ color: '#FFFFFF' }} /> },
            { text: 'Error Logs', icon: <BugReportIcon sx={{ color: '#FFFFFF' }} /> },
            { text: 'Slow Queries', icon: <QueryStatsIcon sx={{ color: '#FFFFFF' }} /> },
            { text: 'Performance', icon: <BarChartIcon sx={{ color: '#FFFFFF' }} /> },
            { text: 'About', icon: <InfoIcon sx={{ color: '#FFFFFF' }} /> },
            { text: 'Account', icon: <AccountCircleIcon sx={{ color: '#FFFFFF' }} /> },
          ].map(({ text, icon }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box className="main-content">
        <Toolbar />
        <Typography variant="h5" className="section-title">
          Key Metrics
        </Typography>
        <Box className="metrics-container">
          <Box className="metric-box">
            <Typography className="metric-label">Total Errors</Typography>
            <Typography className="metric-value">125</Typography>
          </Box>
          <Box className="metric-box">
            <Typography className="metric-label">Average Query Time</Typography>
            <Typography className="metric-value">350ms</Typography>
          </Box>
          <Box className="metric-box">
            <Typography className="metric-label">Slowest Query</Typography>
            <Typography className="metric-value">2.5s</Typography>
          </Box>
        </Box>

        <Typography variant="h5" className="section-title">
          Performance Trends
        </Typography>
        <Box className="graph-container">
          [Graph Placeholder]
        </Box>

        <Typography variant="h5" className="section-title">
          Recent Logs
        </Typography>
        <Box className="logs-container">
          <Typography className="log-message">
            Error: "Cannot read property 'id' of undefined"
          </Typography>
          <Typography className="log-details">
            Query: getUsers | Timestamp: 2025-01-17, 3:15 PM
          </Typography>
          <Divider className="log-divider" />
          <Typography className="log-message">
            Error: "Timeout while fetching posts"
          </Typography>
          <Typography className="log-details">
            Query: getPosts | Timestamp: 2025-01-17, 2:45 PM
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}