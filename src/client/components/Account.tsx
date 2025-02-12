import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useQuery } from '@apollo/client';

import { client, JwtPayload } from '../requests/apollo'; 
import { GET_USER_DATA } from '../requests/gqlQueries';
import { getUserData } from '../requests/queryHooks';
import { getUserDataResponse } from '../requests/queryTypes';
// import { getProjectMetrics } from '../lib/queryHooks';


import { Snackbar, ThemeProvider, createTheme, Paper, IconButton, Tooltip, Container, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, List, Box, 
    Drawer, CssBaseline, AppBar, Toolbar, Typography, Divider, MenuItem, Select, ListItem, 
    ListItemButton, ListItemIcon, ListItemText, CircularProgress, Alert } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WarningIcon from '@mui/icons-material/Warning';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';


import logo from '../assets/GuardQL_Logo_R3_Title2_512px.png';
import '../styles/dashboard.css';

// import {   } from '@mui/material/styles';

const theme = createTheme({
    typography: {
      fontFamily: 'Montserrat, sans-serif',
    },
});

interface NavItem {
    text: string;
    icon: React.ReactNode;
    link: string;
}

const drawerWidth = 240;

export default function Account() {
//   const [showRegenerateDialog, setShowRegenerateDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isReady, setIsReady] = useState(false);


  const navigate = useNavigate();
    
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    // const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('jwt');
        navigate('/login');
        return;
      }
      // If we get here, token is valid
      setIsReady(true);
    } catch (error) {
      // console.error('Token validation error:', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleNavigation = (path: string) => {
    if (path === '/logout') {
      handleLogout();
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    client.clearStore();
    navigate('/login');
  };

  const navItems: NavItem[] = [
    { text: 'Home', icon: <HomeIcon sx={{ color: '#FFFFFF' }} />, link: '/home' },
    { text: 'Dashboard', icon: <DashboardIcon sx={{ color: '#FFFFFF' }} />, link: '/dashboard' },
    { text: 'Performance', icon: <BarChartIcon sx={{ color: '#FFFFFF' }} />, link: '/performance' },
    { text: 'Account', icon: <AccountCircleIcon sx={{ color: '#FFFFFF' }} />, link: '/account' },
    { text: 'Log Out', icon: <LogoutIcon sx={{ color: '#FFFFFF' }} />, link: '/logout' },
  ];

//   const { data, refetch } = getUserData();

  const { data, loading, error } = useQuery(GET_USER_DATA, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    skip: !token,
  });

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    console.log('This is the error for the getUserData query:', error); 
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          Failed to load account information. Please try again later.
        </Alert>
      </Container>
    );
  }

  const userData = data?.getUserData?.userData;

//   let userData = {
//     username: "exampleUser",
//     email: "user@example.com",
//     apiKey: "guardql_sk_abc123xyz789",
//   };

//   const getUserInfo = async () => {
    //  try {
    //     const refetchUserData = ( refetch() as unknown) as { data?: { getUserData: getUserDataResponse } };
    //     console.log('data from account.tsx begins here:', data);
    //     console.log('refetchUserData from account.tsx begins here:', refetchUserData);
    //     if (refetchUserData?.data?.getUserData?.userData) {
    //       const data = refetchUserData.data.getUserData.userData; 
    //       userData['username'] = data.username; 
    //       userData['email'] = data.email; 
    //       userData['apiKey'] = data.api_key; 
    //       console.log('The refetched data begins here:', refetchUserData?.data?.getUserData?.userData)
    //     } 
    //   } catch (error) {
    //     // console.log('useMutation not successful, error begins here:', error);
    //     console.error('There was an error retrieving your account information'); 
    //     userData['username'] = 'There was an error retrieving your username'; 
    //     userData['email'] = 'There was an error retrieving your email'; 
    //     userData['apiKey'] = 'There was an error retrieving your API key'; 
    //   }
    // }

//   getUserInfo(); 

  const maskedApiKey = "guardql_sk_abc...xyz";


  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(userData.api_key);
      setSnackbarMessage('API key copied to clipboard');
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Failed to copy API key:', err);
    }
  };


  return (
    <ThemeProvider theme={theme}>
    <Box className="root">
      <CssBaseline />
      <AppBar className="app-bar" position="fixed">
        <Toolbar>
          <Typography className="header-title" variant="h6">GuardQL Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Drawer className="drawer" variant="permanent" anchor="left">
        <div className="drawer-header">
          <img src={logo} alt="GuardQL Logo" className="drawer-logo"/>
        </div>
        <Divider />
        <List>
          {navItems.map(({ text, icon, link }) => (
            <ListItem key={text} disablePadding>
              {/* <ListItemButton component={Link} to={link}> */}
              <ListItemButton onClick={() => handleNavigation(link)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" className="main-content">
        <Toolbar />
        <Typography variant="h4" gutterBottom className="section-title">
          Account Settings
        </Typography>
        <Box className="slow-queries-container">
          {/* Profile Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Profile Information</Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 300px' }}>
                  <TextField fullWidth label="Username" value={userData?.username || ''} disabled/>
                </Box>
                <Box sx={{ flex: '1 1 300px' }}>
                  <Box sx={{ position: 'relative', width: '100%' }}>
                    <TextField fullWidth label="Email" value={userData?.email || ''} disabled/>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
          {/* API Key Section */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>API Key</Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Use this API key to configure the GuardQL plugin in your GraphQL server.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Paper variant="outlined" sx={{ p: 2, flexGrow: 1, backgroundColor: '#f5f5f5', fontFamily: 'monospace' }}>
                {showApiKey ? userData?.api_key : `${userData.api_key?.substring(0, 6)}...${userData?.api_key.slice(-4)}`}
              </Paper>
              <Tooltip title="Show/Hide API Key">
                <IconButton onClick={() => setShowApiKey(!showApiKey)}>
                  {showApiKey ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Copy to clipboard">
                <IconButton onClick={handleCopyClick}>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>
          {/* add functionality to show when the user's account was created, when they last logged in, allow them to change their password, and enable two factor authentication */}
        </Box>
      </Box>
    </Box>
    </ThemeProvider>
  );
};
