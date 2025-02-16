import React, { useEffect, useState } from 'react';
import { getProjectMetrics } from '../requests/queryHooks';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import { Select, MenuItem} from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import '../styles/dashboard.css';
import logo from '../assets/GuardQL_Logo_R3_Title2_512px.png';
import { Link, useNavigate } from 'react-router-dom';
// import { client } from '../requests/apollo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { jwtDecode } from 'jwt-decode';
import { client, JwtPayload } from '../requests/apollo';
import { getUserProjects } from '../requests/queryHooks';
import { UserProjectData, getUserProjectResponse,  } from '../requests/queryTypes';

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

interface Project {
  id: string;
  name: string;
}

const drawerWidth = 240;

export default function Performance() {

  const [projectsData, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();

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


  // console.log("Performance component is rendering!");

  const navItems: NavItem[] = [
    { text: 'Home', icon: <HomeIcon sx={{ color: '#FFFFFF' }} />, link: '/home' },
    { text: 'Dashboard', icon: <DashboardIcon sx={{ color: '#FFFFFF' }} />, link: '/dashboard' },
    { text: 'Performance', icon: <BarChartIcon sx={{ color: '#FFFFFF' }} />, link: '/performance' },
    { text: 'Account', icon: <AccountCircleIcon sx={{ color: '#FFFFFF' }} />, link: '/account' },
    { text: 'Log Out', icon: <LogoutIcon sx={{ color: '#FFFFFF' }} />, link: '/logout' },
  ];


  const { data, refetch } = getUserProjects();

  const handleOpenDropdown = async () => {
    try {
      const refetchProjects = (await refetch() as unknown) as { data?: { getUserProjects: getUserProjectResponse } };

      if (refetchProjects?.data?.getUserProjects?.projects) {
        setProjects(refetchProjects.data.getUserProjects.projects);
        // console.log('The refetched data begins here:', refetchProjects?.data?.getUserProjects?.projects)
      }
    } catch (error) {
      // console.error('There was an error retrieving the projects:', error)
      setProjects([{ id: '0', name: 'There was an error retrieving the projects'}]);
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
              {/* console.log("Navigating to:", {link}); */}
              {/* <ListItemButton component={Link} to={link}> */}
              <ListItemButton onClick={() => handleNavigation(link)}>
              {/* <ListItemButton onClick={() => handleNavigation(`${link}`)}> */}
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" className="main-content">

      <Toolbar />
        <div className="select-project-section">
        <Typography variant="h6" className="select-title">Select Project:</Typography>
        <Select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          onOpen={handleOpenDropdown}
          onClose={() => setOpen(false)}
          displayEmpty
          className="dropdown"
        >
          <MenuItem className="dropdown-item" value="" disabled>Projects</MenuItem>
          {projectsData.map((project: Project) => (
            <MenuItem className="dropdown-item" key={project.id} value={project.id}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
        </div>

      </Box>
    </Box>
    </ThemeProvider>
    );
};
