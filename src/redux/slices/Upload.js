/* eslint-disable consistent-return */
// firebase
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';


import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../store';
import { FIREBASE_API } from '../../config';
import { uploadTask } from '../../utils/uploadTask';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  depositComplete: false,
};

const slice = createSlice({
  name: 'deposit',
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
    resetState(state) {
      state.isLoading = false;
      state.depositComplete = false;
    },

    // Send reset password email
    depositComplete(state) {
      state.isLoading = false;
      state.depositComplete = true;
    },
    // Send reset password email
    setValues(state, payload) {
      state.walletId = payload.payload.paymentAddress;
      state.cyptoAmount = payload.payload.amountInCrypto;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, sentVerificationEmail, resetState } = slice.actions;

// ----------------------------------------------------------------------

export function uploadProof(file, setUrl) {
    const uuid = uuidv4();
    const id = uuid;
  return async () => {
      console.log('called upload')
    try {
      uploadTask(file, id).then(async (url) => {
        console.log('url', url);
        setUrl(url)
      });
    } catch (error) {
      const errorMessage = error.message;
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}

export function uploadIds(fileOne, FileTwo) {
  return async () => {
    const auth = getAuth()
    dispatch(slice.actions.startLoading());
    
    try {
      uploadTask(fileOne).then(async (url) => {
        console.log('url-onw', url);
        const userRef = doc(DB, 'users', `${auth.currentUser.uid}`);
        await updateDoc(userRef, {
          photo_front_view: url,
        });
        dispatch(slice.actions.depositComplete());
      });
      uploadTask(FileTwo).then(async (url) => {
        console.log('url-two', url);
        const userRef = doc(DB, 'users', `${auth.currentUser.uid}`);
        await updateDoc(userRef, {
          photo_back_view: url,
        });
        dispatch(slice.actions.depositComplete());
      });
      return 'uploaded'
    } catch (error) {
      const errorMessage = error.message;
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}