import React, { useState } from 'react';
import { useProjectMetrics } from './ProjectData';
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
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import './Dashboard.css';
import logo from '../assets/GuardQL_Logo_R_-_Title2-w_2048px.png';

interface NavItem {
  text: string;
  icon: React.ReactNode;
}

const drawerWidth = 240;

export default function Dashboard() {
  const [projectId] = useState('project1');
  
  const {
    metrics,
    loading,
    error,
    errors,
    slowQueries,
    regularQueries
  } = useProjectMetrics(projectId);

  const navItems: NavItem[] = [
    { text: 'Dashboard', icon: <DashboardIcon sx={{ color: '#FFFFFF' }} /> },
    { text: 'Error Logs', icon: <BugReportIcon sx={{ color: '#FFFFFF' }} /> },
    { text: 'Slow Queries', icon: <QueryStatsIcon sx={{ color: '#FFFFFF' }} /> },
    { text: 'Performance', icon: <BarChartIcon sx={{ color: '#FFFFFF' }} /> },
    { text: 'About', icon: <InfoIcon sx={{ color: '#FFFFFF' }} /> },
    { text: 'Account', icon: <AccountCircleIcon sx={{ color: '#FFFFFF' }} /> },
  ];

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

  const renderLogs = () => {
    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error loading logs</Alert>;
    if (!errors?.length) return <Typography>No recent errors</Typography>;

    return (
      <Box className="logs-container">
        {errors.map((error) => (
          <Box key={error.id} className="error-item">
            <Typography className="log-message">
              Operation: {error.operationName}
            </Typography>
            <Typography className="log-details">
              Date: {error.date}, Time: {error.time}
            </Typography>
            {error.errors.map((err, index) => (
              <Box key={index} mb={1}>
                <Typography color="error">
                  Error: {err.message}
                </Typography>
                <Typography variant="caption">
                  Location: Line {err.locations[0]?.line}, Column {err.locations[0]?.column}
                </Typography>
              </Box>
            ))}
            <Typography className="query-text">
              Query: {error.query}
            </Typography>
            <Divider className="log-divider" />
          </Box>
        ))}
      </Box>
    );
  };

  const renderSlowQueries = () => {
    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error loading slow queries</Alert>;
    if (!slowQueries?.length) return <Typography>No slow queries detected</Typography>;

    return (
      <Box className="slow-queries-container">
        {slowQueries.map((query) => (
          <Box key={query.id} className="query-item">
            <Typography className="query-operation">
              Operation: {query.operationName}
            </Typography>
            <Typography className="query-details">
              Execution Time: {query.requestTime}ms
              (Exceeded by {query.thresholdExceededBy}ms)
            </Typography>
            <Typography className="query-threshold">
              Threshold: {query.queryThreshold}ms
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
          {navItems.map(({ text, icon }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
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
          Slow Queries
        </Typography>
        {renderSlowQueries()}

        <Typography variant="h5" className="section-title">
          Recent Logs
        </Typography>
        {renderLogs()}
      </Box>
    </Box>
  );
}