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
import { deleteShipmentFunc } from '../../redux/slices/shipments/deleteshipment';
import { editShipmentFunc } from '../../redux/slices/shipments/editshipment';

const Dashboard = ({ currentUser }) => {
  const dispatch = useDispatch();
  const { success: createdshipment } = useSelector((state) => state.createshipment);
  const { shipments: allshipments } = useSelector((state) => state.featchshipments);
  const { success: deletedShipment } = useSelector((state) => state.deleteshipment);
  const { success: editedShipment } = useSelector((state) => state.editshipment);

  React.useEffect(() => {
    dispatch(fetchShipmentFunc());
  }, [dispatch, createdshipment, deletedShipment, editedShipment]);

  const updateLocation = (shipmentId, newLocation) => {
    dispatch(updateShipmentLocationFunc(shipmentId, newLocation));
  };

  const deleteShipment = (shipmentId) => {
    dispatch(deleteShipmentFunc(shipmentId));
  };

  const editShipment = (shipmentId, updatedData) => {
    dispatch(editShipmentFunc(shipmentId, updatedData));
  };

  const shipmentCount = allshipments?.length || 0;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 1.5, sm: 2, md: 3 }, px: { xs: 1, sm: 2, md: 3 } }}>
      <Grid container spacing={3}>
        {/* Create Shipment Form */}
        <Grid item xs={12}>
          <CreateShipmentForm />
        </Grid>

        {/* Shipment List */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, mb: 2, flexWrap: 'wrap' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
              All Shipments
            </Typography>
            <Chip label={`${shipmentCount} total`} size="small" color="primary" variant="outlined" />
          </Box>
          {shipmentCount === 0 && (
            <Typography color="text.secondary">No shipments yet. Create one above to get started.</Typography>
          )}
          {allshipments && allshipments.map((shipment) => (
            <ShipmentCard key={shipment.id} shipment={shipment} onUpdateLocation={updateLocation} onEdit={editShipment} onDelete={deleteShipment} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
