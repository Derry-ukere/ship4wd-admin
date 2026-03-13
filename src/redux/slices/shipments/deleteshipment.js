// firebase
import { initializeApp } from 'firebase/app';
import { doc, deleteDoc, getFirestore, collection } from 'firebase/firestore';

import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const slice = createSlice({
  name: 'delete-shipment',
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
export const { reset: resetDeleteShipment } = slice.actions;

// ----------------------------------------------------------------------

export function deleteShipmentFunc(shipmentId) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const shipmentRef = doc(collection(DB, 'shipments'), shipmentId);
      await deleteDoc(shipmentRef);

      dispatch(slice.actions.success());
    } catch (error) {
      const errorMessage = error.message;
      console.error('Error deleting shipment:', errorMessage);
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}
