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
import logo from '../assets/GuardQL_Logo_R_-_Title2-w_2048px.png';


interface NavItem {
  text: string;
  icon: React.ReactNode;
  link: string;
}

const drawerWidth = 240;

export default function Dashboard() {
  const [projectId] = useState('12');

  const {
    metrics,
    loading,
    error,
    errors,
    slowQueries,
    regularQueries
  } = getProjectMetrics(projectId);

  const navItems: NavItem[] = [
    { text: 'Home', icon: <HomeIcon sx={{ color: '#FFFFFF' }} />, link: '/#/home' },
    { text: 'Dashboard', icon: <DashboardIcon sx={{ color: '#FFFFFF' }} />, link: '/dashboard' },
    { text: 'Performance', icon: <BarChartIcon sx={{ color: '#FFFFFF' }} />, link: '/performance' },
    { text: 'About', icon: <InfoIcon sx={{ color: '#FFFFFF' }} />, link: '/about'  },
    { text: 'Account', icon: <AccountCircleIcon sx={{ color: '#FFFFFF' }} />, link: '/#/account' },
  ];

  //? working functions begin here ---------------------------------->
  const renderMetrics = () => {
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
    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error loading regular queries</Alert>;
    if (!regularQueries?.metrics.length) return <Typography>No regular queries detected</Typography>;

    return (
      <Box className="slow-queries-container">
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
    );
  };

  const renderSlowQueries = () => {
    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error loading slow queries</Alert>;
    if (!slowQueries?.metrics.length) return <Typography>No slow queries detected</Typography>;

    return (
      <Box className="slow-queries-container">
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
    );
  };

  const renderLogs = () => {
    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error loading logs</Alert>;
    if (!errors?.metrics.length) return <Typography>No recent errors</Typography>;
    // console.log('Error message from data begins here:', errors.metrics[0].error_message); 
    return (
      <Box className="logs-container">
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
            <Divider className="log-divider" />
          </Box>
        ))}
      </Box>
    );
  };
  //? working functions end here ---------------------------------->

  //! original code begins here --------------------------------------------->
  
  // const renderMetrics = () => {
  //   if (loading) {
  //     return (
  //       <Box display="flex" justifyContent="center" p={2}>
  //         <CircularProgress />
  //       </Box>
  //     );
  //   }

  //   if (error) {
  //     return (
  //       <Alert severity="error">
  //         Error loading metrics: {error.message}
  //       </Alert>
  //     );
  //   }

  //   if (!metrics) return null;

  //   return (
  //     <Box className="metrics-container">
  //       <Box className="metric-box">
  //         <Typography className="metric-label">Total Errors</Typography>
  //         <Typography className="metric-value">{metrics.totalErrors}</Typography>
  //       </Box>
  //       <Box className="metric-box">
  //         <Typography className="metric-label">Average Query Time</Typography>
  //         <Typography className="metric-value">{metrics.averageQueryTime}ms</Typography>
  //       </Box>
  //       <Box className="metric-box">
  //         <Typography className="metric-label">Slowest Query</Typography>
  //         <Typography className="metric-value">{metrics.slowestQuery}ms</Typography>
  //       </Box>
  //     </Box>
  //   );
  // };


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

  // const renderSlowQueries = () => {
  //   if (loading) return <CircularProgress />;
  //   if (error) return <Alert severity="error">Error loading slow queries</Alert>;
  //   if (!slowQueries?.length) return <Typography>No slow queries detected</Typography>;

  //   return (
  //     <Box className="slow-queries-container">
  //       {slowQueries.map((query) => (
  //         <Box key={query.id} className="query-item">
  //           <Typography className="query-operation">
  //             Operation: {query.operationName}
  //           </Typography>
  //           <Typography className="query-details">
  //             Execution Time: {query.requestTime}ms
  //             (Exceeded by {query.thresholdExceededBy}ms)
  //           </Typography>
  //           <Typography className="query-threshold">
  //             Threshold: {query.queryThreshold}ms
  //           </Typography>
  //           <Typography className="query-timestamp">
  //             {query.date} {query.time}
  //           </Typography>
  //           <Typography className="query-text">
  //             Query: {query.query}
  //           </Typography>
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
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
                <a href={link}></a>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" className="main-content">
        <Toolbar />
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