import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import UploadSingleFile from './slices/onboarding';
import emailVerification from './slices/emailVerification';
import resetPassword from './slices/resetPassword';
import deposit from './slices/deposit';
import users from './slices/user';
import transactionStatus from './slices/users/transaction-status';



// ----------------------------------------------------------------------//

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  emailVerification,
  resetPassword,
  UploadSingleFile,
  deposit,
  users,
  changeStatus : transactionStatus
});

export { rootPersistConfig, rootReducer };
