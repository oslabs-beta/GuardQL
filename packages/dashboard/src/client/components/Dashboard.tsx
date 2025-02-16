import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { jwtDecode } from 'jwt-decode';

import { client, JwtPayload } from '../requests/apollo'; 
import { getProjectMetrics, getUserProjects } from '../requests/queryHooks';
import { GET_USER_PROJECTS, CREATE_PROJECT } from '../requests/gqlQueries';
import { UserProjectData, getUserProjectResponse,  } from '../requests/queryTypes'; 


import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, List, Box, 
         Drawer, CssBaseline, AppBar, Toolbar, Typography, Divider, MenuItem, Select, ListItem, 
         ListItemButton, ListItemIcon, ListItemText, CircularProgress, Alert } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';

import logo from '../assets/GuardQL_Logo_R3_Title2_512px.png';
import '../styles/dashboard.css';


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

export default function Dashboard() {
  const [projectsData, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [errorProjects, setErrorProjects] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectError, setNewProjectError] = useState("");
  const [isReady, setIsReady] = useState(false);
  // const [projectId] = useState('12');

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("Selected Project ID:", selectedProjectId);
  //   console.log("Returned array of project is her:", projectsData);
  // }, [selectedProjectId]);

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

  // console.log('This is the token before sending the request to getProjectMetrics:', token); 

  const navItems: NavItem[] = [
    { text: 'Home', icon: <HomeIcon sx={{ color: '#FFFFFF' }} />, link: '/home' },
    { text: 'Dashboard', icon: <DashboardIcon sx={{ color: '#FFFFFF' }} />, link: '/dashboard' },
    // { text: 'Performance', icon: <BarChartIcon sx={{ color: '#FFFFFF' }} />, link: '/performance' },
    { text: 'Account', icon: <AccountCircleIcon sx={{ color: '#FFFFFF' }} />, link: '/account' },
    { text: 'Log Out', icon: <LogoutIcon sx={{ color: '#FFFFFF' }} />, link: '/logout' },
  ];

  const [createProject] = useMutation(CREATE_PROJECT);

  const {
    metrics,
    loading,
    error,
    errors,
    slowQueries,
    regularQueries,
    // projects
  } = getProjectMetrics(selectedProjectId);

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

  const { refetch } = getUserProjects(); 

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;
    // console.log('This is the new project name:', newProjectName);
    try {
      await createProject({
        variables: {
          input: {
            name: newProjectName,
          }
        },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}`: '',
          },
        },
      });
      // console.log('data from handleCreateProject function begins here:', data);
      setDialogOpen(false);
      // console.log('setDialogOpen has been set ------->');
      setNewProjectName("");
      // console.log('Going into the refetch function now ------->');
      // const refetchProjects = (await refetch() as unknown) as { data?: { getUserProjects: getUserProjectResponse } };
      // // console.log("Refetch Response:", refetchProjects);

      // if (refetchProjects?.data?.getUserProjects?.projects) {
      //   // console.log("Refetch data being set:", refetchProjects?.data?.getUserProjects);
      //   setProjects(refetchProjects.data.getUserProjects.projects); 
      // } 
    } catch (error) {
      // console.error("Error creating project:", error);
      setNewProjectError('There was an error creating the project'); 
    }
  };

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

  // const renderProjects = () => {
  //   if (!isReady) return <CircularProgress className="circularProgress"/>;
  //   if (loading) return <CircularProgress className="circularProgress"/>;
  //   if (error) return <Alert severity="error">Error loading projects</Alert>;
  //   if (!projects?.projects.length) return <Typography>No projects retrieved</Typography>;
  //   if (projects?.projects) {
  //     // const projectsArray = projects?.projects;
  //     // console.log('The projects data begins here:', projectsArray);
  //     setProjects(projects?.projects);
  //   }
  // };

  const renderMetrics = () => {
    if (!selectedProjectId) {
      return (
        <Box className="metrics-container">
          <Box className="metric-box">
            <Typography className="metric-label">Total Errors</Typography>
            <Typography className="metric-value-undefined">Please select a project to view key metrics</Typography>
          </Box>
          <Box className="metric-box">
            <Typography className="metric-label">Average Query Time</Typography>
            <Typography className="metric-value-undefined">Please select a project to view key metrics</Typography>
          </Box>
          <Box className="metric-box">
            <Typography className="metric-label">Slowest Query</Typography>
            <Typography className="metric-value-undefined">Please select a project to view key metrics</Typography>
          </Box>
        </Box> 
      )
    }
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress className="circularProgress"/>
        </Box>
      );
    }
    if (error) {
      return (
        <Alert severity="error">
          Error loading metrics: {error.message}
        </Alert>
      );
    }
    if (!metrics) return null;

    return (
      <Box className="metrics-container">
        <Box className="metric-box">
          <Typography className="metric-label">Total Errors</Typography>
          <Typography className="metric-value">{metrics.totalErrors}</Typography>
        </Box>
        <Box className="metric-box">
          <Typography className="metric-label">Average Query Time</Typography>
          <Typography className="metric-value">{metrics.averageQueryTime}ms</Typography>
        </Box>
        <Box className="metric-box">
          <Typography className="metric-label">Slowest Query</Typography>
          <Typography className="metric-value">{metrics.slowestQuery}ms</Typography>
        </Box>
      </Box>
    );
  };

  const renderRegularQueries = () => {
    if (!selectedProjectId) {
      return (
        <Box className="slow-queries-container">
        <Box className="scrollable-container">
            <Box className="query-item">
              <Typography className="query-operation">
                Please select a project to view regular query metrics
              </Typography>
            </Box>
        </Box>
        </Box>
      )
    }
    if (loading) return <CircularProgress className="circularProgress"/>;
    if (error) return <Alert severity="error">Error loading regular queries</Alert>;
    if (!regularQueries?.metrics.length) {
      return (
        <Box className="slow-queries-container">
        <Box className="scrollable-container">
            <Box className="query-item">
              <Typography className="query-operation">
                No regular queries found for this project
              </Typography>
            </Box>
        </Box>
        </Box>
      )
    }

    return (
      <Box className="slow-queries-container">
      <Box className="scrollable-container">
        {regularQueries.metrics.map((query) => (
          <Box key={query.id} className="query-item">
            <Typography className="query-operation">
              Operation: {query.operation_name}
            </Typography>
            <Typography className="query-details">
              Execution Time: {query.request_time}ms
            </Typography>
            <Typography className="query-threshold">
              Threshold: {query.query_threshold}ms
            </Typography>
            <Typography className="query-timestamp">
              {query.date} {query.time}
            </Typography>
            <Typography className="query-text">
              Query: {query.query}
            </Typography>
          </Box>
        ))}
      </Box>
      </Box>
    );
  };

  const renderSlowQueries = () => {
    if (!selectedProjectId) {
      return (
        <Box className="slow-queries-container">
        <Box className="scrollable-container">
            <Box className="query-item">
              <Typography className="query-operation">
                Please select a project to view slow query metrics
              </Typography>
            </Box>
        </Box>
        </Box>
      )
    }
    if (loading) return <CircularProgress className="circularProgress"/>;
    if (error) return <Alert severity="error">Error loading slow queries</Alert>;
    if (!slowQueries?.metrics.length) {
      return (
        <Box className="slow-queries-container">
        <Box className="scrollable-container">
            <Box className="query-item">
              <Typography className="query-operation">
                No slow queries found for this project
              </Typography>
            </Box>
        </Box>
        </Box>
      )
    }

    return (
      <Box className="slow-queries-container">
      <Box className="scrollable-container">
        {slowQueries.metrics.map((query) => (
          <Box key={query.id} className="query-item">
            <Typography className="query-operation">
              Operation: {query.operation_name}
            </Typography>
            <Typography className="query-details">
              Execution Time: {query.request_time}ms
              (Exceeded by {query.threshold_exceeded_by}ms)
            </Typography>
            <Typography className="query-threshold">
              Threshold: {query.query_threshold}ms
            </Typography>
            <Typography className="query-timestamp">
              {query.date} {query.time}
            </Typography>
            <Typography className="query-text">
              Query: {query.query}
            </Typography>
          </Box>
        ))}
      </Box>
      </Box>
    );
  };

  const renderLogs = () => {
    if (!selectedProjectId) {
      return (
        <Box className="slow-queries-container">
        <Box className="scrollable-container">
            <Box className="query-item">
              <Typography className="query-operation">
                Please select a project to view error logs
              </Typography>
            </Box>
        </Box>
        </Box>
      )
    }
    if (loading) return <CircularProgress className="circularProgress"/>;
    if (error) return <Alert severity="error">Error loading logs</Alert>;
    if (!errors?.metrics.length) {
      return (
        <Box className="slow-queries-container">
        <Box className="scrollable-container">
            <Box className="query-item">
              <Typography className="query-operation">
                No errors found for this project
              </Typography>
            </Box>
        </Box>
        </Box>
      )
    }
    // console.log('Error message from data begins here:', errors.metrics[0].error_message);
    return (
      <Box className="logs-container">
      <Box className="scrollable-container">
        {errors.metrics.map((error, index) => (
          <Box key={error.id} className="error-item">
            <Typography className="log-message">
              Operation: {error.operation_name}
            </Typography>
            <Typography className="log-details">
              Date: {error.date}, Time: {error.time}
            </Typography>
              <Box key={index} mb={1}>
                <Typography color="error">
                  Error: {error.error_message}
                </Typography>
                <Typography variant="caption">
                  Location: Line {error.line}, Column {error.column}
                </Typography>
              </Box>
            <Typography className="query-text">
              Query: {error.query}
            </Typography>
          </Box>
        ))}
      </Box>
      </Box>
    );
  };
  //! original renderLogs function begins here --------------------------------------------->
  // const renderLogs = () => {
  //   if (loading) return <CircularProgress />;
  //   if (error) return <Alert severity="error">Error loading logs</Alert>;
  //   if (!errors?.length) return <Typography>No recent errors</Typography>;
  //   return (
  //     <Box className="logs-container">
  //       {errors.map((error) => (
  //         <Box key={error.id} className="error-item">
  //           <Typography className="log-message">
  //             Operation: {error.operationName}
  //           </Typography>
  //           <Typography className="log-details">
  //             Date: {error.date}, Time: {error.time}
  //           </Typography>
  //           {error.errors.map((err, index) => (
  //             <Box key={index} mb={1}>
  //               <Typography color="error">
  //                 Error: {err.message}
  //               </Typography>
  //               <Typography variant="caption">
  //                 Location: Line {err.locations[0]?.line}, Column {err.locations[0]?.column}
  //               </Typography>
  //             </Box>
  //           ))}
  //           <Typography className="query-text">
  //             Query: {error.query}
  //           </Typography>
  //           <Divider className="log-divider" />
  //         </Box>
  //       ))}
  //     </Box>
  //   );
  // };
  //! original renderLogs function begins here --------------------------------------------->
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
        <div className="select-project-section">
        <Typography variant="h6" className="select-title">Select Project:</Typography>
        <Select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
        // onChange={(e) => {
        //   if (e.target.value !== 'create-new') {
        //     setSelectedProjectId(e.target.value);
        //   }
        // }}
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
          <MenuItem className="dropdown-item-create" onClick={() => setDialogOpen(true)}>+ Create Project</MenuItem>
        </Select>
        </div>
        {/* //? pop-up to create project begins here -------------------------------------> */}
        <Dialog open={dialogOpen} className="popup" maxWidth="sm" fullWidth
          onClose={() => {
            setDialogOpen(false); 
            setNewProjectName("");
          }}
        >
          <DialogTitle>Create New Project</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Project Name"
              fullWidth
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#e623c6' }, 
                }, 
                '& .MuiInputLabel-root.Mui-focused': { color: '#e623c6' },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button className="cancelButton" color="secondary"
              onClick={() => {
                setDialogOpen(false);
                setNewProjectName("");
              }}
            >Cancel</Button>
            <Button onClick={handleCreateProject} className="createButton" color="primary" variant="contained">Create Project</Button>
            {newProjectError && (<p style={{ color: 'red', marginTop: "10px" }}>{newProjectError}</p>)}
          </DialogActions>
        </Dialog>
        {/* //? pop-up to create project ends here -------------------------------------> */}
        <Typography variant="h5" className="section-title">Key Metrics</Typography>
        {renderMetrics()}
        <Typography variant="h5" className="section-title">Regular Queries</Typography>
        {renderRegularQueries()}
        <Typography variant="h5" className="section-title">Slow Queries</Typography>
        {renderSlowQueries()}
        <Typography variant="h5" className="section-title">Errors</Typography>
        {renderLogs()}
      </Box>
    </Box>
    </ThemeProvider>
  );
}
