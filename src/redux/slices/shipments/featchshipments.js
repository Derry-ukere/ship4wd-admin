// firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection, } from 'firebase/firestore';

import { createSlice } from '@reduxjs/toolkit';


import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  shipments: [],
};

const slice = createSlice({
  name: 'fetch-shipments',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    success(state, action) {
      state.isLoading = false;
      state.shipments = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, sentVerificationEmail, resetState } = slice.actions;

// ----------------------------------------------------------------------

export function fetchShipmentFunc() {
  return async () => {
    dispatch(slice.actions.startLoading());

  try {
    console.log('fetching')
    const shipmentsRef = collection(DB, 'shipments');
    const querySnapshot = await getDocs(shipmentsRef);

    const shipments = [];
    querySnapshot.forEach((doc) => {
      shipments.push({ id: doc.id, ...doc.data() });
    });

        // Dispatch the success action
    dispatch(slice.actions.success(shipments));
  } catch (error) {
    console.error('Error getting shipments:', error);
    dispatch(slice.actions.error(error.message));
  }
 }
}
