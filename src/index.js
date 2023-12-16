import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';

// @mui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

//
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/FirebaseContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


// redux
import { store } from './redux/store';

// ----------------------------------------------------------------------

ReactDOM.render(
  <AuthProvider>
    <HelmetProvider>
      <ReduxProvider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LocalizationProvider>
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
