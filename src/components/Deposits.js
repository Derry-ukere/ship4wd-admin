import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import useAuth from '../hooks/useAuth';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const {deposits} = useAuth();
  return (
    <>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        ${deposits}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </>
  );
}
