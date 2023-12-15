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
import Checkbox from '@mui/material/Checkbox';


import Page from '../components/Page';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { getAllTrader,registerTrade } from '../redux/slices/trades';
import { listUsers } from '../redux/slices/user';




const Privacy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.users);
  const [open, setOpen] = React.useState(false);
  const [amountEntered, setAmount] = React.useState('');
  const [traders, setTrader] = React.useState(null);
  const [positions, setPositon] = React.useState('');
  const [currencyPair, setCurrencyPair] = React.useState('');
  const [traderId, setTraderId] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [userId, setUserId] = React.useState('');
  const [status, setStatus] = React.useState('');




  React.useEffect(() => {
    async function getAllTraders() {
      const traders = await dispatch(getAllTrader())
      setTrader(traders)
    }
    getAllTraders();
  }, []);
  

  React.useEffect(() => {
    async function getAllUsers() {
      await dispatch(listUsers())
    }
    getAllUsers();
  }, []);

 const currencyPairs = [
   {
     pair :  "SHIB/USD",
     img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/pair-icon-dashusd.img.svg?alt=media&token=35cc0066-a30c-4c8a-8d1a-7337db7488b9'
   },
   {
    pair : "TRX/USD",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/pair-icon-atomusd.img.svg?alt=media&token=31a32fca-c5b6-481e-aa16-da0209b4a492'
  },
  {
    pair : "LUNAt/USD",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/pair-icon-xlmusd.img.svg?alt=media&token=b2cb41cb-efe1-4ea4-814e-182ec97cb283'
  },
  {
    pair : 'DOGE/USD',
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/pair-icon-solusd.img.svg?alt=media&token=f0498189-2d04-40a3-b079-8e0adeddae3f'
  },
  {
    pair : "GMTn/USD",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/pair-icon-bnbusd.img%20(1).svg?alt=media&token=4de673e0-4863-4986-9114-2b1a420da0de'
  },
  {
    pair : "MATIC/USD",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/pair-icon-ltcusd.img.svg?alt=media&token=081bed5a-7e60-49a8-bacd-62eab6e839e5'
  },
  {
    pair : "USDT/USD",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/pair-icon-linkusd.img.svg?alt=media&token=e2480698-a8a2-440c-b5aa-62c568d02403'
  },
  {
    pair :  "ALGO/USD",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/pair-icon-filusd.img.svg?alt=media&token=6a2569b7-bf8b-43c2-8a23-43b45b85ef54'
  },
  {
    pair : "APE/USD",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/pair-icon-dashusd.img.svg?alt=media&token=35cc0066-a30c-4c8a-8d1a-7337db7488b9'
  },
  {
    pair : "NEAR/USD",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/pair-icon-neousd.img.svg?alt=media&token=9f723c09-69f3-44dc-8982-6abd055d1eac'
  },
  {
    pair :  "BTC/USD",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/pair-icon-btcusd.img.svg?alt=media&token=ba295595-5eef-4f99-a784-0662dd077c71'
  },
  {
    pair :  "ETH/USD",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/pair-icon-ethusd.img.svg?alt=media&token=8f2e9653-629b-40d5-9ff2-5d4bfefe85c4'
  },
  {
    pair :  "Apple",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/stockshqare.png?alt=media&token=c3ec1bb9-c1b0-4a02-a9f8-b466bbc8cdac'
  },
  {
    pair :  "Adobe",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/stockshqare.png?alt=media&token=c3ec1bb9-c1b0-4a02-a9f8-b466bbc8cdac'
  },
  {
    pair :  "Amazon",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/stockshqare.png?alt=media&token=c3ec1bb9-c1b0-4a02-a9f8-b466bbc8cdac'
  },
  {
    pair :  "American Express",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/stockshqare.png?alt=media&token=c3ec1bb9-c1b0-4a02-a9f8-b466bbc8cdac'
  },
  {
    pair :  "Alibaba",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/stockshqare.png?alt=media&token=c3ec1bb9-c1b0-4a02-a9f8-b466bbc8cdac'
  },
  {
    pair :  "Baidu Inc",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/stockshqare.png?alt=media&token=c3ec1bb9-c1b0-4a02-a9f8-b466bbc8cdac'
  },
  {
    pair :  "AMD",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/stockshqare.png?alt=media&token=c3ec1bb9-c1b0-4a02-a9f8-b466bbc8cdac'
  },
  {
    pair :  "American Tower",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/stockshqare.png?alt=media&token=c3ec1bb9-c1b0-4a02-a9f8-b466bbc8cdac'
  },
  {
    pair :  "Cater Pilla",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/stockshqare.png?alt=media&token=c3ec1bb9-c1b0-4a02-a9f8-b466bbc8cdac'
  },
  {
    pair :  "Cisco",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/stockshqare.png?alt=media&token=c3ec1bb9-c1b0-4a02-a9f8-b466bbc8cdac'
  },
  {
    pair :  "Citi Group",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/stockshqare.png?alt=media&token=c3ec1bb9-c1b0-4a02-a9f8-b466bbc8cdac'
  },
  {
    pair :  "Costco",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/stockshqare.png?alt=media&token=c3ec1bb9-c1b0-4a02-a9f8-b466bbc8cdac'
  },
  {
    pair :  "Chevron",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/stockshqare.png?alt=media&token=c3ec1bb9-c1b0-4a02-a9f8-b466bbc8cdac'
  },
  {
    pair :  "Distney",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/stockshqare.png?alt=media&token=c3ec1bb9-c1b0-4a02-a9f8-b466bbc8cdac'
  },
  {
    pair :  "Ebay",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/stockshqare.png?alt=media&token=c3ec1bb9-c1b0-4a02-a9f8-b466bbc8cdac'
  },
  {
    pair :  "Facebook",
    img : 'https://firebasestorage.googleapis.com/v0/b/trade-9c676.appspot.com/o/stockshqare.png?alt=media&token=c3ec1bb9-c1b0-4a02-a9f8-b466bbc8cdac'
  },
]
  
const handleAMountChnge = (event) => {
    setAmount(event.target.value);
  };

const getImageUrl = (currencyPair) => {
  const urlContainer =[]
  currencyPairs.forEach((eachPair) => {
    if (eachPair.pair === currencyPair){
      urlContainer.push(eachPair.img)
    }
  })
  return urlContainer;
}
const clearState =() => {
  setAmount('')
 
}
  const handleSubmit =  (event) => {
    setLoading(true)
    event.preventDefault();
    const options = {
      amountEntered,
      positions,
      currencyPair,
      traderId,
      userId,
      status,
      imgUrl : getImageUrl(currencyPair)
    }
    dispatch(registerTrade(options)).then(() => {
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
  
  const createSignals =() => {
    navigate('/user/signals')
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


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
            <LoadingButton  type = 'submit' variant="contained" fullWidth style={{marginBottom:20}} onClick = {createSignals}>
             Set Signals
            </LoadingButton>
              <div className="card-panel">
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <div>
                    <div className="input-field">
                      <span className=" prefix">USD</span>
                      <label className="active" htmlFor="amount">
                        Profit
                      </label>
                      <input
                        inputMode="decimal"
                        type="number"
                        id="amount"
                        min={100}
                        step="any"
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
                            {user.displayName} 
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="input-field">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select Trader</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={traderId}
                        label="Select Coin"
                        onChange={(e) => setTraderId(e.target.value) }
                        required
                      >
                        {!traders ? (<MenuItem>loading ...</MenuItem>
                        ) :  traders.map((trader) => (
                          <MenuItem key={trader.id} value={trader.id}>
                            {trader.name}   {trader.subscribers.includes(userId)  &&  <Checkbox {...label} defaultChecked /> }
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl> 
                  </div>
                  <div className="input-field">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">position</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={positions}
                        label="Select Coin"
                        onChange={(e) => setPositon(e.target.value)}
                        required
                      >
                        {['UP', 'DOWN'].map((position,index) => (
                          <MenuItem key={index} value={position}>
                            {position}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="input-field">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Select Coin"
                        onChange={(e) => setStatus(e.target.value)}
                        required
                      >
                        {['WON', 'LOST'].map((position,index) => (
                          <MenuItem key={index} value={position}>
                            {position}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="input-field">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">currency/Stocks</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currencyPair}
                        label="Select Coin"
                        onChange={(e) => setCurrencyPair(e.target.value)}
                        required
                      >
                        {currencyPairs.map((currencypair, index) => (
                          <MenuItem key={index} value={currencypair.pair}>
                            {currencypair.pair}   
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <br />
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

export default Privacy;
