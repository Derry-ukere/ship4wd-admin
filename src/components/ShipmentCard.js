/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
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
import LoadingButton from '@mui/lab/LoadingButton';
import { v4 as uuidv4 } from 'uuid';
import CustomAlert from './Alert'; // Import the CustomAlert component




import { useDispatch, useSelector } from '../redux/store';
import { createShipmentFunc } from '../redux/slices/shipments/createshipment';
// import { updateShipmentLocationFunc } from '../../redux/slices/shipments/updatelocation';
import { fetchShipmentFunc } from '../redux/slices/shipments/featchshipments';


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
        <Typography variant="h6">Tracking Number: {shipment.trackingNumber}</Typography>
        <Typography>Status: {shipment.status}</Typography>
        <Typography>Sender: {shipment.senderName}</Typography>
        <Typography>Receiver: {shipment.receiverName}</Typography>
        <Typography>Weight: {shipment.details.weight}</Typography>
        <Typography>Dimensions: {shipment.details.dimensions}</Typography>
        <Typography>Contents: {shipment.details.contents}</Typography>

        {shipment.locations.map((location, index) => (
          <div key={index}>
            <Typography>Location: {location.location}</Typography>
            <Typography>Description: {location.description}</Typography>
            <Typography>Timestamp: {location.timestamp.toString()}</Typography>
            {/* Add any additional information as needed */}
          </div>
        ))}
        <LoadingButton variant="contained" color="primary" onClick={handleModalOpen}>
          Update Location
        </LoadingButton>




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
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              value={newLocation.description}
              onChange={(e) =>
                setNewLocation({ ...newLocation, description: e.target.value })
              }
              style={{ marginTop: '10px' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose} color="primary">
              Cancel
            </Button>
            <LoadingButton onClick={updateLocation} color="primary">
              Update Location
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};


export default Shipment;
