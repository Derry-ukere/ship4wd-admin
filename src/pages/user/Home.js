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
import CustomAlert from '../../components/Alert';
import ShipmentCard from '../../components/ShipmentCard'; 
import CreateShipmentForm from '../../components/CreateShipmentForm'; 





import { useDispatch, useSelector } from '../../redux/store';
import { createShipmentFunc } from '../../redux/slices/shipments/createshipment';
import { updateShipmentLocationFunc } from '../../redux/slices/shipments/updatelocation';
import { fetchShipmentFunc } from '../../redux/slices/shipments/featchshipments';


const Dashboard = ({ currentUser }) => {
  const dispatch = useDispatch();
  const { isLoading, error, success:createdshipment } = useSelector((state) => state.createshipment);
  const { isLoading:fetchingshipment, error: shipmentserrors, shipments: allshipments } = useSelector((state) => state.featchshipments);

  React.useEffect(() => {
    dispatch(fetchShipmentFunc());
  }, [dispatch,createdshipment]);
  

  const [newShipment, setNewShipment] = useState({
    trackingNumber: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    contents: '',
    initialLocation: '',
  });

  // const [shipments, setShipments] = useState(allshipments);

  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };
 

  const updateLocation = (shipmentId, newLocation,description) => {
   dispatch(updateShipmentLocationFunc(shipmentId,newLocation))
   
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {/* Form to Create Shipment */}
       <Grid item xs={12} style={{ marginTop: '20px' }}>
            <CreateShipmentForm />
       </Grid>

        {/* Display Shipments */}
        <Grid item xs={12} style={{ marginTop: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Shipments
          </Typography>
          {!!allshipments && allshipments.map((shipment) => (
            <ShipmentCard key={shipment.id} shipment={shipment} onUpdateLocation={updateLocation} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
