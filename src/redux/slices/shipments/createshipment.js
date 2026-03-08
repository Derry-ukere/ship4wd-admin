// firebase
import { initializeApp } from 'firebase/app';
import { doc, setDoc, getFirestore, collection } from 'firebase/firestore';

import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  success: false,
};

const slice = createSlice({
  name: 'create-shipments',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    success(state) {
      state.isLoading = false;
      state.success = true;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading } = slice.actions;

// ----------------------------------------------------------------------

export function createShipmentFunc(options) {
  return async () => {
    dispatch(slice.actions.startLoading());

    const myUuid = uuidv4();
    const cleanId = myUuid.replace(/[^a-zA-Z0-9_]/g, '_');

    const shipmentsRef = doc(collection(DB, 'shipments'), cleanId);

    try {
      await setDoc(shipmentsRef, {
        id: cleanId,
        trackingNumber: options.trackingNumber,
        status: options.status || 'Pending Pickup',
        shipmentType: options.shipmentType || 'parcel',
        serviceLevel: options.serviceLevel || 'standard',
        // Sender
        senderName: options.senderName || options.sender?.name || '',
        sender: options.sender || null,
        // Receiver
        receiverName: options.receiverName || options.receiver?.name || '',
        receiver: options.receiver || null,
        // Package details
        details: options.details || {},
        // Service options
        options: options.options || {},
        // Scheduling
        estimatedPickupDate: options.estimatedPickupDate || null,
        specialInstructions: options.specialInstructions || '',
        // Locations
        locations: options.locations || [],
        // Timestamps
        created_at: Math.floor(Date.now() / 1000),
        updated_at: Math.floor(Date.now() / 1000),
      });

      dispatch(slice.actions.success());
    } catch (error) {
      const errorMessage = error.message;
      console.error('Error creating shipment:', errorMessage);
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}
