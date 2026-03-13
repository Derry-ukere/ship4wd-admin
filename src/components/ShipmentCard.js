/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Chip,
  Box,
  Divider,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { dispatch, useSelector } from '../redux/store';
import { fetchShipmentFunc } from '../redux/slices/shipments/featchshipments';

const SHIPPING_STATUS = {
  pending: 'Pending Pickup',
  transit: 'In Transit',
  hold: 'On Hold',
  delivered: 'Delivered',
};

const SHIPMENT_TYPES = [
  { value: 'parcel', label: 'Parcel' },
  { value: 'document', label: 'Document' },
  { value: 'freight', label: 'Freight' },
  { value: 'pallet', label: 'Pallet' },
];

const SERVICE_LEVELS = [
  { value: 'standard', label: 'Standard (5-7 business days)' },
  { value: 'express', label: 'Express (2-3 business days)' },
  { value: 'overnight', label: 'Overnight (next business day)' },
  { value: 'economy', label: 'Economy (7-14 business days)' },
];

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
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 0, sm: 1 }, mb: 0.5 }}>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: { xs: 'auto', sm: 120 }, fontWeight: 500 }}>
        {label}:
      </Typography>
      <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>{value}</Typography>
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

const buildEditFormFromShipment = (shipment) => {
  const sender = shipment.sender || {};
  const receiver = shipment.receiver || {};
  const sAddr = sender.address || {};
  const rAddr = receiver.address || {};
  const details = shipment.details || {};
  const options = shipment.options || {};

  return {
    shipmentType: shipment.shipmentType || 'parcel',
    serviceLevel: shipment.serviceLevel || 'standard',
    status: shipment.status || 'Pending Pickup',
    senderName: sender.name || shipment.senderName || '',
    senderEmail: sender.email || '',
    senderPhone: sender.phone || '',
    senderCompany: sender.company || '',
    senderStreet: sAddr.street || '',
    senderCity: sAddr.city || '',
    senderState: sAddr.state || '',
    senderZip: sAddr.zip || '',
    senderCountry: sAddr.country || '',
    receiverName: receiver.name || shipment.receiverName || '',
    receiverEmail: receiver.email || '',
    receiverPhone: receiver.phone || '',
    receiverCompany: receiver.company || '',
    receiverStreet: rAddr.street || '',
    receiverCity: rAddr.city || '',
    receiverState: rAddr.state || '',
    receiverZip: rAddr.zip || '',
    receiverCountry: rAddr.country || '',
    weight: details.weight || '',
    length: details.length || '',
    width: details.width || '',
    height: details.height || '',
    packageCount: details.packageCount || '1',
    contents: details.contents || '',
    contentCategory: details.contentCategory || '',
    declaredValue: details.declaredValue || '',
    requiresInsurance: options.requiresInsurance || false,
    isFragile: options.isFragile || false,
    requiresSignature: options.requiresSignature || false,
    specialInstructions: shipment.specialInstructions || '',
  };
};

const Shipment = ({ shipment, onUpdateLocation, onEdit, onDelete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isLoading, error, success } = useSelector((state) => state.updatelocation);
  const { isLoading: isDeleting, error: deleteError, success: deleteSuccess } = useSelector((state) => state.deleteshipment);
  const { isLoading: isEditing, error: editError, success: editSuccess } = useSelector((state) => state.editshipment);

  const [newLocation, setNewLocation] = useState({
    location: '',
    description: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(shipment.status || '');
  const [editForm, setEditForm] = useState(() => buildEditFormFromShipment(shipment));
  const [openEditLocationDialog, setOpenEditLocationDialog] = useState(false);
  const [editingLocationIndex, setEditingLocationIndex] = useState(null);
  const [editLocationForm, setEditLocationForm] = useState({ location: '', description: '' });
  const [openDeleteLocationDialog, setOpenDeleteLocationDialog] = useState(false);
  const [deletingLocationIndex, setDeletingLocationIndex] = useState(null);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => {
    setOpenModal(false);
    dispatch(fetchShipmentFunc());
  };

  const handleEditOpen = () => {
    setEditForm(buildEditFormFromShipment(shipment));
    setOpenEditModal(true);
  };
  const handleEditClose = () => setOpenEditModal(false);

  const handleDeleteOpen = () => setOpenDeleteDialog(true);
  const handleDeleteClose = () => setOpenDeleteDialog(false);

  const handleStatusOpen = () => {
    setSelectedStatus(shipment.status || '');
    setOpenStatusDialog(true);
  };
  const handleStatusClose = () => setOpenStatusDialog(false);

  const handleEditLocationOpen = (index) => {
    const loc = shipment.locations[index];
    setEditingLocationIndex(index);
    setEditLocationForm({ location: loc.location || '', description: loc.description || '' });
    setOpenEditLocationDialog(true);
  };
  const handleEditLocationClose = () => {
    setOpenEditLocationDialog(false);
    setEditingLocationIndex(null);
  };
  const handleEditLocationSubmit = (e) => {
    e.preventDefault();
    const updatedLocations = shipment.locations.map((loc, i) =>
      i === editingLocationIndex
        ? { ...loc, location: editLocationForm.location, description: editLocationForm.description }
        : loc
    );
    onEdit(shipment.id, { locations: updatedLocations });
    handleEditLocationClose();
  };

  const handleDeleteLocationOpen = (index) => {
    setDeletingLocationIndex(index);
    setOpenDeleteLocationDialog(true);
  };
  const handleDeleteLocationClose = () => {
    setOpenDeleteLocationDialog(false);
    setDeletingLocationIndex(null);
  };
  const handleDeleteLocationConfirm = () => {
    const updatedLocations = shipment.locations.filter((_, i) => i !== deletingLocationIndex);
    onEdit(shipment.id, { locations: updatedLocations });
    handleDeleteLocationClose();
  };

  const handleStatusSubmit = (e) => {
    e.preventDefault();
    onEdit(shipment.id, { status: selectedStatus });
  };

  const handleEditChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateLocation = (e) => {
    e.preventDefault();
    onUpdateLocation(shipment.id, newLocation);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      shipmentType: editForm.shipmentType,
      serviceLevel: editForm.serviceLevel,
      status: editForm.status,
      senderName: editForm.senderName,
      sender: {
        name: editForm.senderName,
        email: editForm.senderEmail,
        phone: editForm.senderPhone,
        company: editForm.senderCompany,
        address: {
          street: editForm.senderStreet,
          city: editForm.senderCity,
          state: editForm.senderState,
          zip: editForm.senderZip,
          country: editForm.senderCountry,
        },
      },
      receiverName: editForm.receiverName,
      receiver: {
        name: editForm.receiverName,
        email: editForm.receiverEmail,
        phone: editForm.receiverPhone,
        company: editForm.receiverCompany,
        address: {
          street: editForm.receiverStreet,
          city: editForm.receiverCity,
          state: editForm.receiverState,
          zip: editForm.receiverZip,
          country: editForm.receiverCountry,
        },
      },
      details: {
        weight: editForm.weight,
        dimensions: `${editForm.length}x${editForm.width}x${editForm.height} inches`,
        length: editForm.length,
        width: editForm.width,
        height: editForm.height,
        packageCount: editForm.packageCount,
        contents: editForm.contents,
        contentCategory: editForm.contentCategory,
        declaredValue: editForm.declaredValue,
      },
      options: {
        requiresInsurance: editForm.requiresInsurance,
        isFragile: editForm.isFragile,
        requiresSignature: editForm.requiresSignature,
      },
      specialInstructions: editForm.specialInstructions,
    };
    onEdit(shipment.id, updatedData);
  };

  const handleDeleteConfirm = () => {
    onDelete(shipment.id);
    handleDeleteClose();
  };

  React.useEffect(() => {
    if (success) {
      handleModalClose();
      showSnackbar('Location updated successfully');
    }
  }, [dispatch, success]);

  React.useEffect(() => {
    if (editSuccess) {
      handleEditClose();
      handleStatusClose();
      handleEditLocationClose();
      dispatch(fetchShipmentFunc());
      showSnackbar('Shipment updated successfully');
    }
  }, [editSuccess]);

  React.useEffect(() => {
    if (deleteSuccess) {
      showSnackbar('Shipment deleted successfully');
    }
  }, [deleteSuccess]);

  React.useEffect(() => {
    if (error) showSnackbar(error, 'error');
  }, [error]);

  React.useEffect(() => {
    if (editError) showSnackbar(editError, 'error');
  }, [editError]);

  React.useEffect(() => {
    if (deleteError) showSnackbar(deleteError, 'error');
  }, [deleteError]);

  const details = shipment.details || {};
  const options = shipment.options || {};

  return (
    <Card sx={{ mb: 2, borderLeft: 4, borderColor: 'primary.main', overflow: 'hidden' }}>
      <CardContent sx={{ px: { xs: 1.5, sm: 2, md: 3 }, py: { xs: 1.5, sm: 2 } }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2, flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-all' }}>
              #{shipment.trackingNumber}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {shipment.shipmentType && `${shipment.shipmentType.toUpperCase()} `}
              {shipment.serviceLevel && `• ${shipment.serviceLevel}`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip label={shipment.status} color={statusColor(shipment.status)} size="small" />
            <IconButton size="small" color="primary" onClick={handleEditOpen} title="Edit Shipment">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error" onClick={handleDeleteOpen} title="Delete Shipment">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
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
          <Box key={index} sx={{ pl: 2, borderLeft: 2, borderColor: 'grey.300', mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{location.location}</Typography>
              <Typography variant="caption" color="text.secondary">{location.description}</Typography>
              <Typography variant="caption" display="block" color="text.secondary">
                {location.timestamp?.toDate ? location.timestamp.toDate().toLocaleString() : new Date(location.timestamp).toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
              <IconButton size="small" onClick={() => handleEditLocationOpen(index)} title="Edit location">
                <EditIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton size="small" color="error" onClick={() => handleDeleteLocationOpen(index)} title="Delete location">
                <DeleteIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
          <LoadingButton variant="contained" size="small" onClick={handleModalOpen} sx={{ fontSize: { xs: '0.75rem', sm: '0.8125rem' } }}>
            Update Location
          </LoadingButton>
          <Button variant="outlined" size="small" onClick={handleStatusOpen} sx={{ fontSize: { xs: '0.75rem', sm: '0.8125rem' } }}>
            Change Status
          </Button>
        </Box>

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
                multiline
                rows={3}
                placeholder="Describe the current status at this location..."
                value={newLocation.description}
                onChange={(e) => setNewLocation({ ...newLocation, description: e.target.value })}
                required
                style={{ marginTop: '10px' }}
              />
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

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleDeleteClose} maxWidth="xs" fullWidth>
          <DialogTitle>Delete Shipment</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete shipment <strong>#{shipment.trackingNumber}</strong>? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose}>Cancel</Button>
            <LoadingButton onClick={handleDeleteConfirm} color="error" variant="contained" loading={isDeleting}>
              Delete
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* Change Status Dialog */}
        <Dialog open={openStatusDialog} onClose={handleStatusClose} maxWidth="xs" fullWidth>
          <form onSubmit={handleStatusSubmit}>
            <DialogTitle>Change Status</DialogTitle>
            <DialogContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Update the status of shipment <strong>#{shipment.trackingNumber}</strong>
              </Typography>
              <TextField
                select label="Status" fullWidth
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                sx={{ mt: 1 }}
              >
                <MenuItem value={SHIPPING_STATUS.pending}>{SHIPPING_STATUS.pending}</MenuItem>
                <MenuItem value={SHIPPING_STATUS.transit}>{SHIPPING_STATUS.transit}</MenuItem>
                <MenuItem value={SHIPPING_STATUS.hold}>{SHIPPING_STATUS.hold}</MenuItem>
                <MenuItem value={SHIPPING_STATUS.delivered}>{SHIPPING_STATUS.delivered}</MenuItem>
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleStatusClose}>Cancel</Button>
              <LoadingButton type="submit" variant="contained" color="primary" loading={isEditing}>
                Update Status
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>

        {/* Edit Shipment Dialog */}
        <Dialog open={openEditModal} onClose={handleEditClose} maxWidth="md" fullWidth fullScreen={isMobile}>
          <form onSubmit={handleEditSubmit}>
            <DialogTitle>Edit Shipment #{shipment.trackingNumber}</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 0.5 }}>
                {/* Status & Type */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    select label="Status" fullWidth
                    value={editForm.status} onChange={handleEditChange('status')}
                  >
                    <MenuItem value={SHIPPING_STATUS.pending}>{SHIPPING_STATUS.pending}</MenuItem>
                    <MenuItem value={SHIPPING_STATUS.transit}>{SHIPPING_STATUS.transit}</MenuItem>
                    <MenuItem value={SHIPPING_STATUS.hold}>{SHIPPING_STATUS.hold}</MenuItem>
                    <MenuItem value={SHIPPING_STATUS.delivered}>{SHIPPING_STATUS.delivered}</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    select label="Shipment Type" fullWidth
                    value={editForm.shipmentType} onChange={handleEditChange('shipmentType')}
                  >
                    {SHIPMENT_TYPES.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    select label="Service Level" fullWidth
                    value={editForm.serviceLevel} onChange={handleEditChange('serviceLevel')}
                  >
                    {SERVICE_LEVELS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </TextField>
                </Grid>

                {/* Sender */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Sender</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Name" fullWidth value={editForm.senderName} onChange={handleEditChange('senderName')} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Company" fullWidth value={editForm.senderCompany} onChange={handleEditChange('senderCompany')} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Email" fullWidth value={editForm.senderEmail} onChange={handleEditChange('senderEmail')} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Phone" fullWidth value={editForm.senderPhone} onChange={handleEditChange('senderPhone')} />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Street" fullWidth value={editForm.senderStreet} onChange={handleEditChange('senderStreet')} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField label="City" fullWidth value={editForm.senderCity} onChange={handleEditChange('senderCity')} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField label="State" fullWidth value={editForm.senderState} onChange={handleEditChange('senderState')} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField label="Zip" fullWidth value={editForm.senderZip} onChange={handleEditChange('senderZip')} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField label="Country" fullWidth value={editForm.senderCountry} onChange={handleEditChange('senderCountry')} />
                </Grid>

                {/* Receiver */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Receiver</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Name" fullWidth value={editForm.receiverName} onChange={handleEditChange('receiverName')} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Company" fullWidth value={editForm.receiverCompany} onChange={handleEditChange('receiverCompany')} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Email" fullWidth value={editForm.receiverEmail} onChange={handleEditChange('receiverEmail')} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Phone" fullWidth value={editForm.receiverPhone} onChange={handleEditChange('receiverPhone')} />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Street" fullWidth value={editForm.receiverStreet} onChange={handleEditChange('receiverStreet')} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField label="City" fullWidth value={editForm.receiverCity} onChange={handleEditChange('receiverCity')} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField label="State" fullWidth value={editForm.receiverState} onChange={handleEditChange('receiverState')} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField label="Zip" fullWidth value={editForm.receiverZip} onChange={handleEditChange('receiverZip')} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField label="Country" fullWidth value={editForm.receiverCountry} onChange={handleEditChange('receiverCountry')} />
                </Grid>

                {/* Package Details */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Package Details</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Weight" fullWidth type="number"
                    InputProps={{ endAdornment: <InputAdornment position="end">kg</InputAdornment>, inputProps: { min: 0, step: 0.1 } }}
                    value={editForm.weight} onChange={handleEditChange('weight')}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Length" fullWidth type="number"
                    InputProps={{ endAdornment: <InputAdornment position="end">in</InputAdornment>, inputProps: { min: 0, step: 0.1 } }}
                    value={editForm.length} onChange={handleEditChange('length')}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Width" fullWidth type="number"
                    InputProps={{ endAdornment: <InputAdornment position="end">in</InputAdornment>, inputProps: { min: 0, step: 0.1 } }}
                    value={editForm.width} onChange={handleEditChange('width')}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Height" fullWidth type="number"
                    InputProps={{ endAdornment: <InputAdornment position="end">in</InputAdornment>, inputProps: { min: 0, step: 0.1 } }}
                    value={editForm.height} onChange={handleEditChange('height')}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField label="Package Count" fullWidth type="number" value={editForm.packageCount} onChange={handleEditChange('packageCount')} />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField label="Content Category" fullWidth value={editForm.contentCategory} onChange={handleEditChange('contentCategory')} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Declared Value" fullWidth type="number"
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment>, inputProps: { min: 0, step: 0.01 } }}
                    value={editForm.declaredValue} onChange={handleEditChange('declaredValue')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Contents Description" fullWidth value={editForm.contents} onChange={handleEditChange('contents')} />
                </Grid>

                {/* Service Options */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Service Options</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={<Checkbox checked={editForm.requiresInsurance} onChange={handleEditChange('requiresInsurance')} />}
                    label="Insurance"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={<Checkbox checked={editForm.isFragile} onChange={handleEditChange('isFragile')} />}
                    label="Fragile"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={<Checkbox checked={editForm.requiresSignature} onChange={handleEditChange('requiresSignature')} />}
                    label="Signature Required"
                  />
                </Grid>

                {/* Special Instructions */}
                <Grid item xs={12}>
                  <TextField
                    label="Special Instructions" fullWidth multiline rows={2}
                    value={editForm.specialInstructions} onChange={handleEditChange('specialInstructions')}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose}>Cancel</Button>
              <LoadingButton type="submit" variant="contained" color="primary" loading={isEditing}>
                Save Changes
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>

        {/* Edit Location Dialog */}
        <Dialog open={openEditLocationDialog} onClose={handleEditLocationClose} maxWidth="sm" fullWidth>
          <form onSubmit={handleEditLocationSubmit}>
            <DialogTitle>Edit Location</DialogTitle>
            <DialogContent>
              <TextField
                label="Location"
                fullWidth
                required
                value={editLocationForm.location}
                onChange={(e) => setEditLocationForm((prev) => ({ ...prev, location: e.target.value }))}
                sx={{ mt: 1 }}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                placeholder="Describe the current status at this location..."
                required
                value={editLocationForm.description}
                onChange={(e) => setEditLocationForm((prev) => ({ ...prev, description: e.target.value }))}
                sx={{ mt: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditLocationClose}>Cancel</Button>
              <LoadingButton type="submit" variant="contained" color="primary" loading={isEditing}>
                Save
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>

        {/* Delete Location Confirmation Dialog */}
        <Dialog open={openDeleteLocationDialog} onClose={handleDeleteLocationClose} maxWidth="xs" fullWidth>
          <DialogTitle>Delete Location Entry</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to remove this location entry? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteLocationClose}>Cancel</Button>
            <LoadingButton onClick={handleDeleteLocationConfirm} color="error" variant="contained" loading={isEditing}>
              Delete
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* Snackbar for feedback */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default Shipment;
