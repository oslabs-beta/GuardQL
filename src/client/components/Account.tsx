import React, { useEffect, useState } from 'react';
import { getProjectMetrics } from './ProjectData';
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
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import './Dashboard.css';
import logo from '../assets/GuardQL_Logo_R3_Title2_512px.png';
import { Link, useNavigate } from 'react-router-dom';


interface NavItem {
  text: string;
  icon: React.ReactNode;
  link: string;
}

const drawerWidth = 240;



export default function Account() {
    // console.log("Performance component is rendering!");

     const navigate = useNavigate();

    const handleNavigation = (path: string) => {
      navigate(path);
    };

    const navItems: NavItem[] = [
        { text: 'Home', icon: <HomeIcon sx={{ color: '#FFFFFF' }} />, link: '/home' },
        { text: 'Dashboard', icon: <DashboardIcon sx={{ color: '#FFFFFF' }} />, link: '/dashboard' },
        { text: 'Performance', icon: <BarChartIcon sx={{ color: '#FFFFFF' }} />, link: '/performance' },
        // { text: 'About', icon: <InfoIcon sx={{ color: '#FFFFFF' }} />, link: '/about'  },
        { text: 'Account', icon: <AccountCircleIcon sx={{ color: '#FFFFFF' }} />, link: '/account' },
    ];

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

        <Drawer
          className="drawer"
          variant="permanent"
          anchor="left"
        >
          <div className="drawer-header">
            <img
              src={logo}
              alt="GuardQL Logo"
              className="drawer-logo"
            />
          </div>
          <Divider />
          <List>
            {navItems.map(({ text, icon, link }) => (
              <ListItem key={text} disablePadding>
                {/* console.log("Navigating to:", {link}); */}
                <ListItemButton component={Link} to={link}>
                {/* <ListItemButton onClick={() => handleNavigation(`${link}`)}> */}
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        </Box>
    );
};
