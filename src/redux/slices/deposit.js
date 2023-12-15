// firebase
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { doc, setDoc, getFirestore, getDocs, updateDoc,arrayUnion, getDoc, collection, query, } from 'firebase/firestore';

import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../store';
import { FIREBASE_API } from '../../config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  depositComplete: false,
  allDeposit : null,
  singleDeposit : null,
  allWithdrawals : null
};

const slice = createSlice({
  name: 'deposit',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state){
      state.isLoading = false;
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
    depositComplete(state, payload) {
      state.isLoading = false;
      state.depositComplete = true;
      state.allDeposit = payload.payload
    },

    gotDeposit(state, payload) {
      state.isLoading = false;
      state.singleDeposit = payload.payload
    },

    gotAllWithdrawals(state, payload) {
      state.isLoading = false;
      state.allWithdrawals = payload.payload
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, sentVerificationEmail, resetState } = slice.actions;

// ----------------------------------------------------------------------

export function depositFunds(options) {
  return async () => {
    dispatch(slice.actions.startLoading());
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


export function getAllDeposit() {
  return async () => {
    console.log('getting deposits');
    
    dispatch(slice.actions.startLoading());
    const container = [];
    try {
      const q = query(collection(DB, 'deposits'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        container.push(doc.data());
      });
      dispatch(slice.actions.depositComplete(container));
    } catch (error) {
      const errorMessage = error.message;
      console.log('err',errorMessage )
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}

export function createTrader() {
  return async () => {
    dispatch(slice.actions.startLoading());
    const losses= 23
    const wins = 56
    // const { name, losses, wins,imageUrl } = options;
    const uuid = 'tradrsid';
    const traderId = uuid;
    const total = losses + wins
    const  winRate = wins/total * 100
    const  lossRate = 100 - winRate
    console.log(winRate,lossRate)

    try {
      await setDoc(doc(DB, 'trades', `${traderId}`), {
        id: traderId,
        imageUrl : 'image',
        name : 'name',
        losses,
        wins,
        winRate : `${winRate.toFixed(2)}%`,
        lossRate : `${lossRate.toFixed(2)}%`,
        subscribers : [],
      }).then(() => {
        console.log('created trade')
      });
    } catch (error) {
      const errorMessage = error.message;
      console.log('err', errorMessage)
      dispatch(slice.actions.hasError(errorMessage));
    }
    return traderId;
  };
}
export function updateDeposit(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const userRef = doc(DB, 'deposits', `${id}`);
      const docSnap = await getDoc(userRef);
      if(docSnap.exists()){
        const currentStatus = docSnap.data().isApproved
         await updateDoc(userRef, {
        isApproved: !currentStatus,
      });
      }
      dispatch(slice.actions.stopLoading());
    } catch (error) {
      const errorMessage = error.message; 
      console.log('err',errorMessage )
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}
export function clearState() {
  return async () => {
    dispatch(slice.actions.resetState());
  };

}

export function getDeposit(id) {
  console.log('id', id)
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const userRef = doc(DB, 'deposits', `${id}`);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const depositDetails = docSnap.data();
        dispatch(slice.actions.gotDeposit(depositDetails));
      } else {
        dispatch(slice.actions.hasError('something went worng'));
      }
    } catch (error) {
      const errorMessage = error.message;
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}


export function getAllWithdrawals() {
  return async () => {
    console.log('getting withdrawals');
    
    dispatch(slice.actions.startLoading());
    const container = [];
    try {
      const q = query(collection(DB, 'withdrawals'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        container.push(doc.data());
      });
      dispatch(slice.actions.gotAllWithdrawals(container));
    } catch (error) {
      const errorMessage = error.message;
      console.log('err',errorMessage )
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}