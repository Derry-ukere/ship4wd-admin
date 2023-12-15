/* eslint-disable consistent-return */
// firebase
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { doc, setDoc, getFirestore, getDocs, updateDoc,arrayUnion,  collection, query, where } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

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
      console.log('deposits', container)
      dispatch(slice.actions.gotAllDeposits(container));
    } catch (error) {
      const errorMessage = error.message;
      console.log('err',errorMessage )
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}

export function getAllTrader() {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
        const container = []
        const q = query(collection(DB, 'traders'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          container.push(doc.data());
        });
        return container
     
      } catch (error) {
        const errorMessage = error.message
        console.error('err', error)
        dispatch(slice.actions.hasError(errorMessage));
      }
    };
  }

 
  export function registerTrade(options) {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
          const {amountEntered, positions, currencyPair, traderId, imgUrl, userId, status} = options;
          const trader =  query(collection(DB, 'traders'),  where('id', '==', traderId));
          const querySnapshot = await getDocs(trader);
          const traderContainer = []
          querySnapshot.forEach((doc) => {
            traderContainer.push(doc.data())
           
          });

          if (status === 'WON'){
            try {
              const uuid = uuidv4();
              const profitIdId = uuid;
               setDoc(doc(DB, 'Profits', `${profitIdId}`), {
                user_id: userId,
                amount: amountEntered,
              }).then(() => {
                console.log('profit trade')
              });
            } catch (error) {
              const errorMessage = error.message;
              console.error('err', errorMessage)
            }
          }else {
            try {
              const uuid = uuidv4();
              const profitIdId = uuid;
               setDoc(doc(DB, 'withdrawals', `${profitIdId}`), {
                user_id: userId,
                amount: amountEntered,
                isApproved : true
              }).then(() => {
                console.log('withdrawals trade')
              });
            } catch (error) {
              const errorMessage = error.message;
              console.error('err', errorMessage)
            }
          }




          // create trade
          const d = new Date();
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 
          try {
            const uuid = uuidv4();
            const tradeId = uuid;
            setDoc(doc(DB, 'trades', `${tradeId}`), {
              id: traderId,
              amount: amountEntered,
              positions,
              currencyPair,
              userId,
              status,
              tradernAME : traderContainer[0].name,
              imageUrl:imgUrl[0],
              day: d.getDate(),
              month :months[d.getMonth()]
            }).then(() => {
             console.log('trade created')
           });
        
         } catch (error) {
           const errorMessage = error.message;
           console.error('err', errorMessage)
         }
      } catch (error) {
        const errorMessage = error.message;
        console.error('err', errorMessage)
        dispatch(slice.actions.hasError(errorMessage));
      }
    };
  }


export function createTrader(options, setLoading, setOpen) {
  return async () => {
    dispatch(slice.actions.startLoading());
    setLoading(true)
    const { name, losses, wins,url } = options;
    const winings = Number(wins)
    const allosses = Number(losses)
    const uuid = uuidv4();
    const traderId = uuid;
    const total = allosses + winings
    const  winRate = winings/total * 100
    const  lossRate = 100 - winRate
    
    try {
      await setDoc(doc(DB, 'traders', `${traderId}`), {
        id: traderId,
        imageUrl : url,
        name,
        losses,
        wins,
        winRate : `${winRate.toFixed(2)}%`,
        lossRate : `${lossRate.toFixed(2)}%`,
        subscribers : [],
      }).then(() => {
        console.log('trader created')
        setLoading(false);
        setOpen(true)
      });
    } catch (error) {
      const errorMessage = error.message;
      dispatch(slice.actions.hasError(errorMessage));
    }
    return traderId;
  };
}
export function clearState() {
  return async () => {
    dispatch(slice.actions.resetState());
  };
}
