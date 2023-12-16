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
  Box,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { v4 as uuidv4 } from 'uuid';
import CustomAlert from './Alert';
import CreatesShipmentForm from './ShipmentCard'; // Import the CustomAlert component




import { useDispatch, useSelector } from '../redux/store';
import { createShipmentFunc } from '../redux/slices/shipments/createshipment';
// import { updateShipmentLocationFunc } from '../../redux/slices/shipments/updatelocation';
// import { fetchShipmentFunc } from '../redux/slices/shipments/featchshipments';


const ShipmentForm = ({ currentUser }) => {
  const dispatch = useDispatch();
  const { isLoading, error, success:createdshipment } = useSelector((state) => state.createshipment);
  const { isLoading:fetchingshipment, error: shipmentserrors, shipments: allshipments } = useSelector((state) => state.featchshipments);



  const [newShipment, setNewShipment] = useState({
    trackingNumber: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    contents: '',
    initialLocation: '',
  });


  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  function generateUniqueId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000); // Adjust the range as needed
    const uniqueId = `${timestamp}-${random}`;
    return uniqueId;
  }
 

  const createShipment = () => {
    try {
        const myUuid = uuidv4();
        const cleanId = myUuid.replace(/[.#$\/\[\]]/g, "_");
        const uniqueId = generateUniqueId()
        const newShipmentData = {
          id: cleanId,
          trackingNumber: uniqueId,
          status: 'In Transit',
          senderName:newShipment.senderName,
          receiverName :newShipment.receiverName,
          details: {
            weight: newShipment.weight,
            dimensions: `${newShipment.length}x${newShipment.width}x${newShipment.height} inches`,
            contents: newShipment.contents,
          },
          locations: [
            {
              timestamp: new Date(),
              location: newShipment.initialLocation,
              description: 'Shipment created and dispatched.',
            },
          ],
        };
    
        // Log the form data to the console
        dispatch(createShipmentFunc(newShipmentData)) 
    
    
        // // Clear form fields
        // setNewShipment({
        //   senderName: '',
        //   receiverName : '',
        //   weight: '',
        //   length: '',
        //   width: '',
        //   height: '',
        //   contents: '',
        //   initialLocation: '',
        //   description : ''
        // });

        // dispatch(fetchShipmentFunc());
    } catch (error) {
        console.error(error)
    }
  };

  const updateLocation = (shipmentId, newLocation) => {
  console.log('locateion')
  };

  return (
    <Box>
    <Typography color={"red"}>{error}</Typography>
 
      <Typography variant="h5" gutterBottom>
        Create Shipment
      </Typography>
      <TextField
        label="Senders Name"
        variant="outlined"
        fullWidth
        value={newShipment.senderName}
        onChange={(e) =>
          setNewShipment({ ...newShipment, senderName: e.target.value })
        }
      />
      <TextField
        label="Receivers Name"
        variant="outlined"
        fullWidth
        value={newShipment.receiverName}
        onChange={(e) =>
          setNewShipment({ ...newShipment, receiverName: e.target.value })
        }
      />
      <TextField
        label="Weight (kg)"
        variant="outlined"
        fullWidth
        value={newShipment.weight}
        onChange={(e) => setNewShipment({ ...newShipment, weight: e.target.value })}
      />
      <TextField
        label="Length (inches)"
        variant="outlined"
        fullWidth
        value={newShipment.length}
        onChange={(e) => setNewShipment({ ...newShipment, length: e.target.value })}
      />
      <TextField
        label="Width (inches)"
        variant="outlined"
        fullWidth
        value={newShipment.width}
        onChange={(e) => setNewShipment({ ...newShipment, width: e.target.value })}
      />
      <TextField
        label="Height (inches)"
        variant="outlined"
        fullWidth
        value={newShipment.height}
        onChange={(e) => setNewShipment({ ...newShipment, height: e.target.value })}
      />
      <TextField
        label="Contents e.g electronics or jwells"
        variant="outlined"
        fullWidth
        value={newShipment.contents}
        onChange={(e) => setNewShipment({ ...newShipment, contents: e.target.value })}
      />
      <TextField
        label="Initial Location"
        variant="outlined"
        fullWidth
        value={newShipment.initialLocation}
        onChange={(e) => setNewShipment({ ...newShipment, initialLocation: e.target.value })}
      />
      <TextField
        label="Activities description"
        variant="outlined"
        fullWidth
        value={newShipment.description}
        onChange={(e) => setNewShipment({ ...newShipment, description: e.target.value })}
      />

{createdshipment && (
    <CustomAlert
      severity={"success"}
      title={"Shipment created succesfully"}
      message={""}
    />
  )}
      <LoadingButton
        loading = {isLoading}
        variant="contained"
        color="primary"
        onClick={createShipment}
        style={{ marginTop: '10px' }}
      >
        Create Shipment
      </LoadingButton>
    </Box>
  );
};

export default ShipmentForm;
