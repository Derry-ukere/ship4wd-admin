// firebase
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore,  updateDoc,arrayUnion, } from 'firebase/firestore';

import { createSlice } from '@reduxjs/toolkit';

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

export function updateShipmentLocationFunc(options) {
  return async () => {
    dispatch(slice.actions.startLoading());
    console.log('options', options)
    const { amountEntered, paymemnetCoin, amountInCrypto, paymentAddress, destinantion, depositId } = options;
    const auth = getAuth();
    const usersRef = doc(DB, 'users', 'admin');

    try {
      const updateDetails = {
        id: depositId,
        user_id: auth.currentUser.uid,
        amount: amountEntered,
        currency: 'USD',
        paymentMethod: paymemnetCoin,
        amountInCrypto,
        status: 'Pending',
        paymentAddress,
        destinantion,
        proof: '',
        createdByAdmin: 0,
        deleted_at: null,
        created_at: Math.floor(Date.now() / 1000),
        updated_at: Math.floor(Date.now() / 1000),
      };
      await updateDoc(usersRef, {
        deposits: arrayUnion(updateDetails),
      });
      dispatch(slice.actions.depositComplete());
      console.log('done')
    } catch (error) {
      const errorMessage = error.message;
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}
