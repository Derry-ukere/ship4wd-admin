/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import { useNavigate } from 'react-router-dom';

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LoadingButton } from '@mui/lab';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Page from '../components/Page';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { listUsers,setSignal } from '../redux/slices/user';




const Signals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.users);
  const [open, setOpen] = React.useState(false);
  const [amountEntered, setAmount] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [userId, setUserId] = React.useState('');
  

  React.useEffect(() => {
    async function getAllUsers() {
      await dispatch(listUsers())
    }
    getAllUsers();
  }, []);

const handleAMountChnge = (event) => {
    setAmount(event.target.value);
  };

  const clearState =() => {
    setAmount('')
   
  }
  const handleSubmit =  (event) => {
    setLoading(true)
    event.preventDefault();
    const options = {
      amountEntered,
      userId,
    }
    dispatch(setSignal(options)).then(() => {
      setOpen(true)
      setLoading(false);
      clearState()
    })
  };

  const push = () => {
    navigate('/user/trading/new-trader')
  }

  const view =() => {
    navigate('/user/trading/traders')
  }
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <Page title="Trade">
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{vertical : 'top', horizontal : 'right' }}>
          <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Trade was successfull !
          </MuiAlert>
       </Snackbar>
    <div className="app-relative hero-mixed">
      <div className="overlay1" />
      <div className="fade-appear-done fade-enter-done" style={{ paddingBottom: '6rem', paddingTop: '2rem' }}>
        <h1 className="center app-relative white-text">Place a Trade</h1>
      </div>
    </div>
    <main className="app-py-1" style={{ height: '100vh' }}>
        <div className="fade-appear-done fade-enter-done">
        
          <section className="row">
          
            <div className="col l4 offset-l4 s12">
            <LoadingButton  type = 'submit' variant="contained" fullWidth style={{marginBottom:10}} onClick = {push}>
             Create New Trader
            </LoadingButton>
            <LoadingButton  type = 'submit' variant="contained" fullWidth style={{marginBottom:20}} onClick = {view}>
             View Traders
            </LoadingButton>

              <div className="card-panel">
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <div>
                    <div className="input-field">
                      <label className="active" htmlFor="amount">
                        Signal Strenght
                      </label>
                      <input
                        inputMode="decimal"
                        type="number"
                        id="amount"
                        step="any"
                        max = {100}
                        name="amount"
                        className
                        required
                        value={amountEntered}
                        onChange={handleAMountChnge}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select User</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userId}
                        label="Select Coin"
                        onChange={(e) => setUserId(e.target.value) }
                        required
                      >
                        {!users? (<MenuItem>loading ...</MenuItem>) : users.map((user) => (
                          <MenuItem key={user.uid} value={user.uid}>
                            {user.displayName} -signal {user.signalStrength}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                  <LoadingButton  type = 'submit' variant="contained" loading = {loading}>
                        Proceed
                  </LoadingButton>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
  </Page>
  )
};

export default Signals;
