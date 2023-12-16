// firebase
import { initializeApp } from 'firebase/app';
import { doc, setDoc, getFirestore, collection, } from 'firebase/firestore';

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
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    // HAS ERROR
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
export const { hasError, startLoading, sentVerificationEmail, resetState } = slice.actions;

// ----------------------------------------------------------------------

export function createShipmentFunc(options) {
  return async () => {
    dispatch(slice.actions.startLoading());
    console.log('options', options)

  // Destructuring options
  // const {trackingNumber, id, senderName, receiverName, weight,details,locations, length, width, height, contents, initialLocation, description } = options;
  const { trackingNumber, id, senderName, receiverName, details, locations } = options;

  const myUuid = uuidv4();
  const cleanId = myUuid.replace(/[^a-zA-Z0-9_]/g, "_");


  // Reference to the 'shipments' collection
  const shipmentsRef = doc(collection(DB, 'shipments'), cleanId);

  // const shipmentsRef = collection(DB, 'shipments', 'okro');
  try {

    // Create a new shipment document
    await setDoc(shipmentsRef, {
      id,
      trackingNumber,
      senderName,
      receiverName,
      status: 'In Transit',
      created_at: Math.floor(Date.now() / 1000),
      updated_at: Math.floor(Date.now() / 1000),
      details: {
        weight: details.weight,
        dimensions: details.dimensions,
        contents: details.contents,
      },
      locations: [
        {
          timestamp: new Date(),
          location: locations[0].location, // Assuming locations is an array
          description: locations[0].description,
        },
      ],
    });

    console.log('created shipment')
    // Dispatch the success action
    dispatch(slice.actions.success());

  } catch (error) {
    // Handle errors and dispatch the hasError action
    const errorMessage = error.message;
    console.log('errr :', errorMessage)
    dispatch(slice.actions.hasError(errorMessage));
  }
  };
}
