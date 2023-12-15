import { createSlice } from '@reduxjs/toolkit';
import { getFirestore, collection,query,getDocs,where,doc,deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth,updatePassword,} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { FIREBASE_API } from '../../config';


// import { updateCandididate } from '../../utils/authUtils';

import { dispatch } from '../store';


const firebaseApp = initializeApp(FIREBASE_API);

const DB = getFirestore(firebaseApp);
const auth = getAuth();




// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  users: [], 
  adminUsers :[], 
  traders : null,
  isVerificationEmailSent: false,
  token: null,
};

const slice = createSlice({
  name: 'candidate',
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

    // Update  Candidate
    allUser(state, {payload}) {
      state.isLoading = false;
      state.users = payload
    },
      // Update  Candidate
    adminUsers(state, {payload}) {
        state.isLoading = false;
        state.adminUsers = payload
    },
    gotTraders(state, {payload}) {
      state.isLoading = false;
      state.traders = payload
  },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, sentVerificationEmail, updateCandidateSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function listUsers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const container = [];
      const q = query(collection(DB, 'users'),where('type', '==', "user"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        container.push(doc.data());
      });
      // const res = await updateCandididate(userInfo);
      // Email verification sent!
      dispatch(slice.actions.allUser(container));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


export function listAdminUsers() {
  return async () => {
    console.log('caled')
    dispatch(slice.actions.startLoading());
    try {
      const container = []
      const q = query(collection(DB, 'users'), where('type', '==', "admin"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        container.push(doc.data());
      });
      console.log('container', container)
      // const res = await updateCandididate(userInfo);  
      console.log(container);
      // Email verification sent!
      dispatch(slice.actions.adminUsers(container));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function listTraders() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const container = []
      const q = query(collection(DB, 'traders'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        container.push(doc.data());
      });
      console.log('tradrs', container)
      dispatch(slice.actions.gotTraders(container));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteTraders(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await deleteDoc(doc(DB, "traders", `${id}`)).then(() => {
        console.log('deleted trader')
      })
      
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteUserHandler(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      console.log('id', id)
      deleteDoc(doc(DB, "users", `${id}`)).then(() => {
        console.log('deleted user  from db')
      }).catch((error) => {
        console.log('deleted error from db: ', error)
      });

      
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function approvedDeposit(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const userRef = doc(DB, 'withdrawals', `${id}`);
      const docSnap = await getDoc(userRef);
      if(docSnap.exists()){
        const currentStatus = docSnap.data().isApproved
         await updateDoc(userRef, {
        isApproved: !currentStatus,
      });
      }
      // dispatch(slice.actions.stopLoading());
    } catch (error) {
      const errorMessage = error.message; 
      console.log('err',errorMessage )
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}

export function updateRange(id,range) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const userRef = doc(DB, 'users', `${id}`);
      const docSnap = await getDoc(userRef);
      if(docSnap.exists()){
         await updateDoc(userRef, {
        range,
      });
      console.log('updated')
      }
      // dispatch(slice.actions.stopLoading());
    } catch (error) {
      const errorMessage = error.message; 
      console.log('err',errorMessage )
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}

export function setSignal(options) {
  return async () => {
    const {amountEntered, userId} = options;
    dispatch(slice.actions.startLoading());
    try {
      const userRef = doc(DB, 'users', `${userId}`);

      await updateDoc(userRef, {
        signalStrength: amountEntered,
      });
      
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteAdmin(id) {
  return async () => {
    console.log('caled' ,id)
    dispatch(slice.actions.startLoading());
    try {
      await deleteDoc(doc(DB, "users", `${id}`)).then(() => {
        console.log('deleted trader')
      })
      
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export const UpdateUserPassword = (options) => {
  const user = auth.currentUser
  const {newPassword,setOpen,setIsLoading,setComfirmPassword,setPassword} = options
  updatePassword(user, newPassword).then(() => {
      setOpen(true)
      setIsLoading(false)
      setComfirmPassword('')
      setPassword('')
  }).catch(() => {
    // An error ocurred
    // ...
  });
}

export const UpdateEmail = (options) => {
  const user = auth.currentUser
  const {newPassword,setOpen,setIsLoading,setComfirmPassword,setPassword} = options
  updatePassword(user, newPassword).then(() => {
    console.log('passsword updated')
      setOpen(true)
      setIsLoading(false)
      setComfirmPassword('')
      setPassword('')
  }).catch(() => {
    // An error ocurred
    // ...
  });
}
