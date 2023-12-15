import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const CustomSnackbar = ({ open, onClose, severity, title, message }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(open);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
    onClose(); // Notify the parent component that the snackbar is closed
  };

  return (
    <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
