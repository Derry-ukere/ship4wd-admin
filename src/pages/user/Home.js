/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Chart from '../../components/Chart';
import Deposits from '../../components/Deposits';
import UsersTable from '../../components/UsersTable';

import { useDispatch, useSelector } from '../../redux/store';
import { listUsers } from '../../redux/slices/user';


const Home = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);

  React.useEffect(() => {
    dispatch(listUsers())
   },[])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            {/* <Orders /> */}
            <UsersTable users={users}/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
