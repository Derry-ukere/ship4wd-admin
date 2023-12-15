import { createSlice } from '@reduxjs/toolkit';
import { getFirestore,doc, updateDoc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { FIREBASE_API } from '../../../config';

import { dispatch } from '../../store';


const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);




// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  success : false
};

const slice = createSlice({
  name: 'transaction-status',
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

    // HAS SUCCESS
    success(state) {
        state.success = true;
      },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, sentVerificationEmail, updateCandidateSuccess } = slice.actions;

// ----------------------------------------------------------------------


export function changeStatus(id) {
  return async () => {
    console.log('connected', id)
    dispatch(slice.actions.startLoading());
    try {
      const userRef = doc(DB, 'users', `${id}`);
      const docSnap = await getDoc(userRef);
      if(docSnap.exists()){
        console.log('changed status',docSnap.data())
        const currentStatus = docSnap.data().status || false
         await updateDoc(userRef, {
        status: !currentStatus,
      });
      }
      dispatch(slice.actions.success()); 
    } catch (error) {
      const errorMessage = error.message; 
      console.log('err',errorMessage )
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}


