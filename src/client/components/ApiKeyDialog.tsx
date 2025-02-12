import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Alert,
  Paper,
  Tooltip
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface ApiKeyDialogProps {
  open: boolean;
  apiKey: string;
  onClose: () => void;
}

const ApiKeyDialog = ({ open, apiKey, onClose }: ApiKeyDialogProps) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const maskedApiKey = `${apiKey.substring(0, 6)}...${apiKey.slice(-4)}`;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Your account has been created successfully!
      </DialogTitle>
      <DialogContent>
        {/* <Typography variant="body1" gutterBottom>

        </Typography> */}
        <Alert severity="warning" sx={{ mb: 2 }}>
          Make sure to copy your API key now. You won't be able to see it again!
        </Alert>
        <Typography variant="body1" gutterBottom>
          You'll need this API key to configure the GuardQL plugin in your GraphQL server.
        </Typography>
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 2, 
            mt: 2, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f5f5f5'
          }}
        >
          <Typography 
            // variant="mono" 
            sx={{ 
              fontFamily: 'monospace',
              flexGrow: 1
            }}
          >
            {showApiKey ? apiKey : maskedApiKey}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title={showApiKey ? "Hide API Key" : "Show API Key"}>
              <IconButton 
                onClick={() => setShowApiKey(!showApiKey)}
                size="small"
              >
                {showApiKey ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
              <IconButton 
                onClick={handleCopyClick}
                size="small"
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>
        {copied && (
          <Typography 
            variant="caption" 
            color="success.main"
            sx={{ mt: 1, display: 'block' }}
          >
            API key copied to clipboard!
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          I've saved my API key
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApiKeyDialog;