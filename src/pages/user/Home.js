/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  Typography,
  Container,
  Grid,
  Box,
  Chip,
} from '@mui/material';
import ShipmentCard from '../../components/ShipmentCard';
import CreateShipmentForm from '../../components/CreateShipmentForm';

import { useDispatch, useSelector } from '../../redux/store';
import { updateShipmentLocationFunc } from '../../redux/slices/shipments/updatelocation';
import { fetchShipmentFunc } from '../../redux/slices/shipments/featchshipments';

const Dashboard = ({ currentUser }) => {
  const dispatch = useDispatch();
  const { success: createdshipment } = useSelector((state) => state.createshipment);
  const { shipments: allshipments } = useSelector((state) => state.featchshipments);

  React.useEffect(() => {
    dispatch(fetchShipmentFunc());
  }, [dispatch, createdshipment]);

  const updateLocation = (shipmentId, newLocation) => {
    dispatch(updateShipmentLocationFunc(shipmentId, newLocation));
  };

  const shipmentCount = allshipments?.length || 0;

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Grid container spacing={3}>
        {/* Create Shipment Form */}
        <Grid item xs={12}>
          <CreateShipmentForm />
        </Grid>

        {/* Shipment List */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              All Shipments
            </Typography>
            <Chip label={`${shipmentCount} total`} size="small" color="primary" variant="outlined" />
          </Box>
          {shipmentCount === 0 && (
            <Typography color="text.secondary">No shipments yet. Create one above to get started.</Typography>
          )}
          {allshipments && allshipments.map((shipment) => (
            <ShipmentCard key={shipment.id} shipment={shipment} onUpdateLocation={updateLocation} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
