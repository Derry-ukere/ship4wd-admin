// firebase
import { initializeApp } from 'firebase/app';
import { doc, getFirestore,  updateDoc,arrayUnion,collection } from 'firebase/firestore';

import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//




// Create a new slice for updating shipment location
const updateLocationSlice = createSlice({
  name: 'update-location',
  initialState: {
    isLoading: false,
    error: null,
    success: false,
  },
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
export default updateLocationSlice.reducer;
// Reducer
export const { startLoading: startUpdateLocationLoading, hasError: updateLocationHasError, success: updateLocationSuccess } =
  updateLocationSlice.actions;



// Function to update shipment location
export function updateShipmentLocationFunc(shipmentId, newLocation) {
  return async () => {
    dispatch(updateLocationSlice.actions.startLoading());
    console.log('Updating location:', { shipmentId, newLocation });

    try {
      // Reference to the specific shipment document
      const shipmentRef = doc(collection(DB, 'shipments'), shipmentId);

      // Use arrayUnion to update the locations array
      await updateDoc(shipmentRef, {
        status : newLocation.status,
        locations: arrayUnion({
          timestamp: new Date(),
          location: newLocation.location,
          description: newLocation.description,
        }),
      });

      console.log('Location updated successfully');
      dispatch(updateLocationSlice.actions.success());
    } catch (error) {
      const errorMessage = error.message;
      console.error('Error updating location:', errorMessage);
      dispatch(updateLocationSlice.actions.hasError(errorMessage));
    }
  };
}
