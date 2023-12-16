/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import {
  Typography,
  TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CustomAlert from './Alert';
import { useDispatch, useSelector } from '../redux/store';
import { createShipmentFunc } from '../redux/slices/shipments/createshipment';
import { fetchShipmentFunc } from '../redux/slices/shipments/featchshipments';

import { v4 as uuidv4 } from 'uuid';

const ShipmentForm = () => {
  const dispatch = useDispatch();
  const { isLoading, error, success: createdshipment } = useSelector((state) => state.createshipment);

  const [newShipment, setNewShipment] = useState({
    senderName: '',
    receiverName: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    contents: '',
    initialLocation: '',
    description: '',
  });

  const createShipment = (e) => {
    e.preventDefault();
    try {
      const myUuid = uuidv4();
      const cleanId = myUuid.replace(/[.#$\/\[\]]/g, "_");
      const uniqueId = generateUniqueId();

      const newShipmentData = {
        id: cleanId,
        trackingNumber: uniqueId,
        status: 'In Transit',
        senderName: newShipment.senderName,
        receiverName: newShipment.receiverName,
        details: {
          weight: newShipment.weight,
          dimensions: `${newShipment.length}x${newShipment.width}x${newShipment.height} inches`,
          contents: newShipment.contents,
        },
        locations: [
          {
            timestamp: new Date(),
            location: newShipment.initialLocation,
            description: newShipment.description,
          },
        ],
      };

      dispatch(createShipmentFunc(newShipmentData));

      setNewShipment({
        senderName: '',
        receiverName: '',
        weight: '',
        length: '',
        width: '',
        height: '',
        contents: '',
        initialLocation: '',
        description: '',
      });
      dispatch(fetchShipmentFunc())
    } catch (error) {
      console.error(error);
    }
  };

  const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    return `${timestamp}-${random}`;
  };

  return (
    <form onSubmit={createShipment}>
      <Typography color={"red"}>{error}</Typography>

      <Typography variant="h5" gutterBottom>
        Create Shipment
      </Typography>
      <TextField
        label="Sender's Name"
        variant="outlined"
        fullWidth
        required
        value={newShipment.senderName}
        onChange={(e) => setNewShipment({ ...newShipment, senderName: e.target.value })}
      />
      <TextField
        label="Receiver's Name"
        variant="outlined"
        fullWidth
        required
        value={newShipment.receiverName}
        onChange={(e) => setNewShipment({ ...newShipment, receiverName: e.target.value })}
      />
      <TextField
        label="Weight (kg)"
        variant="outlined"
        fullWidth
        required
        value={newShipment.weight}
        onChange={(e) => setNewShipment({ ...newShipment, weight: e.target.value })}
      />
      <TextField
        label="Length (inches)"
        variant="outlined"
        fullWidth
        required
        value={newShipment.length}
        onChange={(e) => setNewShipment({ ...newShipment, length: e.target.value })}
      />
      <TextField
        label="Width (inches)"
        variant="outlined"
        fullWidth
        required
        value={newShipment.width}
        onChange={(e) => setNewShipment({ ...newShipment, width: e.target.value })}
      />
      <TextField
        label="Height (inches)"
        variant="outlined"
        fullWidth
        required
        value={newShipment.height}
        onChange={(e) => setNewShipment({ ...newShipment, height: e.target.value })}
      />
      <TextField
        label="Contents e.g electronics or jwells"
        variant="outlined"
        fullWidth
        required
        value={newShipment.contents}
        onChange={(e) => setNewShipment({ ...newShipment, contents: e.target.value })}
      />
      <TextField
        label="Initial Location"
        variant="outlined"
        fullWidth
        required
        value={newShipment.initialLocation}
        onChange={(e) => setNewShipment({ ...newShipment, initialLocation: e.target.value })}
      />
      <TextField
        label="Activities description"
        variant="outlined"
        fullWidth
        required
        value={newShipment.description}
        onChange={(e) => setNewShipment({ ...newShipment, description: e.target.value })}
      />

      {createdshipment && (
        <CustomAlert
          severity={"success"}
          title={"Shipment created successfully"}
          message={""}
        />
      )}
      <LoadingButton
        loading={isLoading}
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: '10px' }}
      >
        Create Shipment
      </LoadingButton>
    </form>
  );
};

export default ShipmentForm;
