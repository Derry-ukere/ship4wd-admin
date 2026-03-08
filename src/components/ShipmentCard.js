/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Chip,
  Box,
  Divider,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { dispatch, useSelector } from '../redux/store';
import { fetchShipmentFunc } from '../redux/slices/shipments/featchshipments';

const SHIPPING_STATUS = {
  pending: 'Pending Pickup',
  transit: 'In Transit',
  hold: 'On Hold',
  delivered: 'Delivered',
};

const statusColor = (status) => {
  switch (status) {
    case 'Delivered': return 'success';
    case 'In Transit': return 'info';
    case 'On Hold': return 'warning';
    case 'Pending Pickup': return 'default';
    default: return 'default';
  }
};

const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120, fontWeight: 500 }}>
        {label}:
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );
};

const AddressBlock = ({ title, data }) => {
  if (!data) return null;
  const addr = data.address || {};
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>{title}</Typography>
      <InfoRow label="Name" value={data.name} />
      {data.company && <InfoRow label="Company" value={data.company} />}
      <InfoRow label="Email" value={data.email} />
      <InfoRow label="Phone" value={data.phone} />
      {addr.street && (
        <InfoRow
          label="Address"
          value={[addr.street, addr.city, addr.state, addr.zip, addr.country].filter(Boolean).join(', ')}
        />
      )}
    </Box>
  );
};

const Shipment = ({ shipment, onUpdateLocation }) => {
  const { isLoading, error, success } = useSelector((state) => state.updatelocation);

  const [newLocation, setNewLocation] = useState({
    location: '',
    description: '',
    status: '',
  });

  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => {
    setOpenModal(false);
    dispatch(fetchShipmentFunc());
  };

  const updateLocation = (e) => {
    e.preventDefault();
    onUpdateLocation(shipment.id, newLocation);
  };

  React.useEffect(() => {
    if (success) {
      handleModalClose();
    }
  }, [dispatch, success]);

  const details = shipment.details || {};
  const options = shipment.options || {};

  return (
    <Card sx={{ mb: 2, borderLeft: 4, borderColor: 'primary.main' }}>
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              #{shipment.trackingNumber}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {shipment.shipmentType && `${shipment.shipmentType.toUpperCase()} `}
              {shipment.serviceLevel && `• ${shipment.serviceLevel}`}
            </Typography>
          </Box>
          <Chip label={shipment.status} color={statusColor(shipment.status)} size="small" />
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          {/* Sender & Receiver */}
          <Grid item xs={12} md={6}>
            {shipment.sender ? (
              <AddressBlock title="Sender" data={shipment.sender} />
            ) : (
              <InfoRow label="Sender" value={shipment.senderName} />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {shipment.receiver ? (
              <AddressBlock title="Receiver" data={shipment.receiver} />
            ) : (
              <InfoRow label="Receiver" value={shipment.receiverName} />
            )}
          </Grid>

          {/* Package Details */}
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>Package Details</Typography>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={3}><InfoRow label="Weight" value={details.weight ? `${details.weight} kg` : null} /></Grid>
              <Grid item xs={6} sm={3}><InfoRow label="Dimensions" value={details.dimensions} /></Grid>
              <Grid item xs={6} sm={3}><InfoRow label="Packages" value={details.packageCount} /></Grid>
              <Grid item xs={6} sm={3}><InfoRow label="Value" value={details.declaredValue ? `$${details.declaredValue}` : null} /></Grid>
            </Grid>
            <InfoRow label="Category" value={details.contentCategory} />
            <InfoRow label="Contents" value={details.contents} />
          </Grid>

          {/* Service Options */}
          {(options.requiresInsurance || options.isFragile || options.requiresSignature) && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {options.requiresInsurance && <Chip label="Insured" size="small" variant="outlined" color="primary" />}
                {options.isFragile && <Chip label="Fragile" size="small" variant="outlined" color="warning" />}
                {options.requiresSignature && <Chip label="Signature Required" size="small" variant="outlined" color="info" />}
              </Box>
            </Grid>
          )}

          {/* Special Instructions */}
          {shipment.specialInstructions && (
            <Grid item xs={12}>
              <InfoRow label="Instructions" value={shipment.specialInstructions} />
            </Grid>
          )}

          {/* Estimated Pickup */}
          {shipment.estimatedPickupDate && (
            <Grid item xs={12}>
              <InfoRow label="Pickup Date" value={shipment.estimatedPickupDate} />
            </Grid>
          )}
        </Grid>

        {/* Location History */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Location History</Typography>
        {shipment.locations && shipment.locations.map((location, index) => (
          <Box key={index} sx={{ pl: 2, borderLeft: 2, borderColor: 'grey.300', mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>{location.location}</Typography>
            <Typography variant="caption" color="text.secondary">{location.description}</Typography>
            <Typography variant="caption" display="block" color="text.secondary">
              {location.timestamp?.toDate ? location.timestamp.toDate().toLocaleString() : new Date(location.timestamp).toLocaleString()}
            </Typography>
          </Box>
        ))}

        <LoadingButton variant="contained" size="small" sx={{ mt: 1 }} onClick={handleModalOpen}>
          Update Location
        </LoadingButton>

        {/* Modal to Update Location */}
        <Dialog open={openModal} onClose={handleModalClose} maxWidth="sm" fullWidth>
          <form>
            <DialogTitle>Update Location</DialogTitle>
            <DialogContent>
              <TextField
                label="Enter Current Location"
                variant="outlined"
                fullWidth
                value={newLocation.location}
                onChange={(e) => setNewLocation({ ...newLocation, location: e.target.value })}
                required
                style={{ marginTop: '10px' }}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={newLocation.description}
                onChange={(e) => setNewLocation({ ...newLocation, description: e.target.value })}
                required
                style={{ marginTop: '10px' }}
              />
              <br />
              <InputLabel sx={{ mt: 1 }}>Status</InputLabel>
              <Select
                value={newLocation.status}
                onChange={(e) => setNewLocation({ ...newLocation, status: e.target.value })}
                fullWidth
              >
                <MenuItem value={SHIPPING_STATUS.pending}>{SHIPPING_STATUS.pending}</MenuItem>
                <MenuItem value={SHIPPING_STATUS.transit}>{SHIPPING_STATUS.transit}</MenuItem>
                <MenuItem value={SHIPPING_STATUS.hold}>{SHIPPING_STATUS.hold}</MenuItem>
                <MenuItem value={SHIPPING_STATUS.delivered}>{SHIPPING_STATUS.delivered}</MenuItem>
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalClose} color="primary">
                Cancel
              </Button>
              <LoadingButton onClick={updateLocation} color="primary" type="submit" loading={isLoading}>
                Update Location
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default Shipment;
