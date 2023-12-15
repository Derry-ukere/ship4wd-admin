import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const Shipment = ({ shipment, onUpdateLocation }) => {
  const [newLocation, setNewLocation] = useState({
    location: '',
    description: '',
  });

  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const updateLocation = () => {
    onUpdateLocation(shipment.id, newLocation);
    handleModalClose();
  };

  return (
    <Card key={shipment.id} style={{ marginBottom: '10px' }}>
      <CardContent>
        <Typography variant="h6">Tracking Number: {1122}</Typography>
        <Typography>Status: {shipment.status}</Typography>
        <Typography>Sender ID: {shipment.senderId}</Typography>
        <Typography>Weight: {shipment.details.weight}</Typography>
        <Typography>Dimensions: {shipment.details.dimensions}</Typography>
        <Typography>Contents: {shipment.details.contents}</Typography>
        <Button variant="contained" color="primary" onClick={handleModalOpen}>
          Update Location
        </Button>

        {/* Modal to Update Location */}
        <Dialog open={openModal} onClose={handleModalClose}>
          <DialogTitle>Update Location</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={newLocation.location}
                onChange={(e) =>
                  setNewLocation({ ...newLocation, location: e.target.value })
                }
              >
                <MenuItem value="Warehouse A">Warehouse A</MenuItem>
                <MenuItem value="Warehouse B">Warehouse B</MenuItem>
                {/* Add more locations as needed */}
              </Select>
            </FormControl>
            {/* Rest of the form fields */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose} color="primary">
              Cancel
            </Button>
            <Button onClick={updateLocation} color="primary">
              Update Location
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default Shipment;
