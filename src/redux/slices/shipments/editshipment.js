// firebase
import { initializeApp } from 'firebase/app';
import { doc, updateDoc, getFirestore, collection } from 'firebase/firestore';

import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const slice = createSlice({
  name: 'edit-shipment',
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
    reset(state) {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { reset: resetEditShipment } = slice.actions;

// ----------------------------------------------------------------------

export function editShipmentFunc(shipmentId, updatedData) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const shipmentRef = doc(collection(DB, 'shipments'), shipmentId);

      await updateDoc(shipmentRef, {
        ...updatedData,
        updated_at: Math.floor(Date.now() / 1000),
      });

      dispatch(slice.actions.success());
    } catch (error) {
      const errorMessage = error.message;
      console.error('Error editing shipment:', errorMessage);
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}
