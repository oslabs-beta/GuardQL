import React, { useEffect, useState } from 'react';
import { getProjectMetrics, getUserProjects, GET_USER_PROJECTS } from './ProjectData';
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
// import BugReportIcon from '@mui/icons-material/BugReport';
// import QueryStatsIcon from '@mui/icons-material/QueryStats';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
// import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import './Dashboard.css';
import logo from '../assets/GuardQL_Logo_R_-_Title2-w_2048px.png';
import { Link, useNavigate } from 'react-router-dom';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { CREATE_PROJECT } from './ProjectData'; 
import { useMutation } from '@apollo/client'; 
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
// import { SelectChangeEvent } from '@mui/material';
// import { useQuery } from '@apollo/client';

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

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const [projectId] = useState('12');

  const [createProject, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_PROJECT); 

  const {
    metrics,
    loading,
    error,
    errors,
    slowQueries,
    regularQueries,
    projects
  } = getProjectMetrics(selectedProjectId);

  
  const NoProjectSelected = () => (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      p={4}
      sx={{ 
        border: '1px dashed #ccc',
        borderRadius: '4px',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Typography variant="body1" color="text.secondary">
        Please select a project to view metric data
      </Typography>
    </Box>
  );


  // useEffect(() => {
  //   console.log("Selected Project ID:", selectedProjectId);
  //   console.log("Returned array of project is her:", projectsData);
  // }, [selectedProjectId]);


  const navItems: NavItem[] = [
    { text: 'Home', icon: <HomeIcon sx={{ color: '#FFFFFF' }} />, link: '/home' },
    { text: 'Dashboard', icon: <DashboardIcon sx={{ color: '#FFFFFF' }} />, link: '/dashboard' },
    { text: 'Performance', icon: <BarChartIcon sx={{ color: '#FFFFFF' }} />, link: '/performance' },
    // { text: 'About', icon: <InfoIcon sx={{ color: '#FFFFFF' }} />, link: '/about'  },
    { text: 'Account', icon: <AccountCircleIcon sx={{ color: '#FFFFFF' }} />, link: '/account' },
  ];


  const token = localStorage.getItem('jwt'); 

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return; 
    // console.log('This is the new project name:', newProjectName); 
    try {
      const { data } = await createProject({ 
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
      setNewProjectName(""); 

    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const renderProjects = () => {
    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error loading projects</Alert>;
    if (!projects?.projects.length) return <Typography>No projects retrieved</Typography>;
    if (projects?.projects) {
      // const projectsArray = projects?.projects; 
      // console.log('The projects data begins here:', projectsArray); 
      setProjects(projects?.projects); 
    }
  }; 

  const renderMetrics = () => {
    if (!selectedProjectId) {
      return (
        <Box display="flex" justifyContent="center" p={2}>
          <NoProjectSelected />
        </Box>
      )
    }

    if (loading) {
      return (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress />
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
        <Box display="flex" justifyContent="center" p={2}>
          <NoProjectSelected />
        </Box>
      )
    }

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error loading regular queries</Alert>;
    if (!regularQueries?.metrics.length) return <Typography>No regular queries detected</Typography>;

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
        <Box display="flex" justifyContent="center" p={2}>
          <NoProjectSelected />
        </Box>
      )
    }

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error loading slow queries</Alert>;
    if (!slowQueries?.metrics.length) return <Typography>No slow queries detected</Typography>;

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
        <Box display="flex" justifyContent="center" p={2}>
          <NoProjectSelected />
        </Box>
      )
    }

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error loading logs</Alert>;
    if (!errors?.metrics.length) return <Typography>No recent errors</Typography>;
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

            {/* what is mb?? */}
              <Box key={index} mb={1}>
                <Typography color="error">
                  Error: {error.error_message}
                </Typography>
                <Typography variant="caption">
                  Location: Line {error.line}, Column {error.column}
                </Typography>
              </Box>
            {/* {error.map((err, index) => (
              <Box key={index} mb={1}>
                <Typography color="error">
                  Error: {err.message}
                </Typography>
                <Typography variant="caption">
                  Location: Line {err.locations[0]?.line}, Column {err.locations[0]?.column}
                </Typography>
              </Box>
            ))} */}
            <Typography className="query-text">
              Query: {error.query}
            </Typography>
            {/* <Divider className="log-divider" /> */}
          </Box>
        ))}
      </Box>
      </Box>
    );
  };

  //! original renderLogs begins here --------------------------------------------->
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
  //! original code ends here --------------------------------------------->

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
              <ListItemButton component={Link} to={link}>
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
        <Typography variant="h6" className="section-title">
          Select Project:
        </Typography>
        <Select
        //  defaultValue=""
         value={selectedProjectId}
         onChange={(e) => setSelectedProjectId(e.target.value)}
        // onChange={(e) => {
        //   if (e.target.value !== 'create-new') {
        //     setSelectedProjectId(e.target.value);
        //   }
        // }}
         onOpen={renderProjects}
         onClose={() => setOpen(false)}
         displayEmpty
         className="dropdown"
        >
        <MenuItem className="dropdown-item" value="" disabled>
         Select a Project
        </MenuItem>
        {projectsData.map((project) => (
          <MenuItem className="dropdown-item" key={project.id} value={project.id}>
            {project.name}
          </MenuItem>
        ))}
        <MenuItem className="dropdown-item-create" 
        // value="create-new" 
        onClick={() => setDialogOpen(true)}>
         + Create New Project
        </MenuItem>
        </Select>
        </div>





        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            fullWidth
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateProject} color="primary" variant="contained">
            Create Project
          </Button>
        </DialogActions>
      </Dialog>





        <Typography variant="h5" className="section-title">
          Key Metrics
        </Typography>
        {renderMetrics()}

        <Typography variant="h5" className="section-title">
          Regular Queries
        </Typography>
        {renderRegularQueries()}

        <Typography variant="h5" className="section-title">
          Slow Queries
        </Typography>
        {renderSlowQueries()}

        <Typography variant="h5" className="section-title">
          Errors
        </Typography>
        {renderLogs()}
      </Box>
    </Box>
  );
}