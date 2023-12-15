import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export const MainListItems = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleCLick = (location) => {
    navigate(`/user/${location}`);
  };
  return (
    <>
      <ListItemButton onClick={() => handleCLick('')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" sx={{ color: 'black' }} />
      </ListItemButton>
      <ListItemButton onClick={() => handleCLick('settings')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" sx={{ color: 'black' }} />
      </ListItemButton>
      <ListItemButton onClick={() => logout()}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" sx={{ color: 'black' }} />
      </ListItemButton>
    </>
  );
};
