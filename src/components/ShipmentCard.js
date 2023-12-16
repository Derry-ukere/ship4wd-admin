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




import { dispatch, useDispatch, useSelector } from '../redux/store';
import { createShipmentFunc } from '../redux/slices/shipments/createshipment';
// import {  updateShipmentLocationFunc} from '../../redux/slices/shipments/updatelocation';
import { fetchShipmentFunc } from '../redux/slices/shipments/featchshipments';


const Shipment = ({ shipment, onUpdateLocation }) => {
  const { isLoading, error, success } = useSelector((state) => state.updatelocation);

  const [newLocation, setNewLocation] = useState({
    location: '',
    description: '',
  });

  const [openModal, setOpenModal] = useState(false);
  const [parcelId, setparcelId] = useState('')

  const handleModalOpen = (id) => {
    setOpenModal(true);
    setparcelId(id)
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const updateLocation = (e) => {
    e.preventDefault()
    onUpdateLocation(shipment.id, newLocation);
    
  };

  React.useEffect(()=>{
if(success){
  handleModalClose();
  dispatch(fetchShipmentFunc())
}
  },[success])
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
        <br/>

        <Typography variant='h6'>Locations:</Typography>
        {shipment.locations.map((location, index) => (
          <div key={index}>
            <Typography>Location: {location.location}</Typography>
            <Typography>Description: {location.description}</Typography>
            <Typography>Timestamp: {location.timestamp.toString()}</Typography>
            ********
          </div>
        ))}
        <LoadingButton variant="contained" color="primary" onClick={handleModalOpen}>
          Update Location
        </LoadingButton>

         {/* Modal to Update Location */}
         <Dialog open={openModal} onClose={handleModalClose}>
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
           
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose} color="primary">
              Cancel
            </Button>
            <LoadingButton onClick={updateLocation} color="primary" type='submit' loading = {isLoading}>
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
