import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

// @mui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

//
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/FirebaseContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


// redux
import { store, persistor } from './redux/store';

// ----------------------------------------------------------------------

ReactDOM.render(
  <AuthProvider>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LocalizationProvider>
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
  </AuthProvider>,
  document.getElementById('root')
);

// for the app work offline and load faster, can change
// unregister() to register() below.
serviceWorkerRegistration.unregister();

// to start measuring perfomance pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();
