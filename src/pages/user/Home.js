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
            <Button onClick={updateLocation} color="primary">
              Update Location
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const Dashboard = ({ currentUser }) => {
  const [newShipment, setNewShipment] = useState({
    trackingNumber: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    contents: '',
    initialLocation: 'Warehouse A',
  });

  const [shipments, setShipments] = useState([
    {
      id: '1',
      trackingNumber: 'ABC123',
      status: 'In Transit',
      senderId: 'admin_user_id',
      details: {
        weight: '5 kg',
        dimensions: '12x8x6 inches',
        contents: 'Electronics',
      },
      locations: [
        {
          timestamp: new Date(),
          location: 'Warehouse A',
          description: 'Parcel received and processed.',
        },
      ],
    },
    // Add more mock shipments as needed
  ]);

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

  const createShipment = () => {
    const newShipmentData = {
      id: String(shipments.length + 1),
      trackingNumber: newShipment.trackingNumber,
      status: 'In Transit',
      senderId: currentUser.uid,
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

    setShipments([...shipments, newShipmentData]);
    setNewShipment({
      trackingNumber: '',
      weight: '',
      length: '',
      width: '',
      height: '',
      contents: '',
      initialLocation: 'Warehouse A',
    });
  };

  const updateLocation = (shipmentId, newLocation) => {
    const updatedShipments = shipments.map((shipment) => {
      if (shipment.id === shipmentId) {
        return {
          ...shipment,
          locations: [
            ...shipment.locations,
            {
              timestamp: new Date(),
              location: newLocation.location,
              description: newLocation.description,
            },
          ],
        };
      }
      return shipment;
    });

    setShipments(updatedShipments);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {/* Form to Create Shipment */}
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            Create Shipment
          </Typography>
          <TextField
            label="Tracking Number"
            variant="outlined"
            fullWidth
            value={newShipment.trackingNumber}
            onChange={(e) =>
              setNewShipment({ ...newShipment, trackingNumber: e.target.value })
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
            label="Contents"
            variant="outlined"
            fullWidth
            value={newShipment.contents}
            onChange={(e) => setNewShipment({ ...newShipment, contents: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={createShipment}
            style={{ marginTop: '10px' }}
          >
            Create Shipment
          </Button>
        </Grid>

        {/* Display Shipments */}
        <Grid item xs={12} style={{ marginTop: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Shipments
          </Typography>
          {shipments.map((shipment) => (
            <Shipment key={shipment.id} shipment={shipment} onUpdateLocation={updateLocation} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
