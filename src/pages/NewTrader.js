/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import ReactLoading from 'react-loading';

import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

// redux
import { useDispatch } from '../redux/store';
import { uploadProof } from '../redux/slices/Upload';
import { createTrader } from '../redux/slices/trades';


const UploadProof = () => {
  const dispatch = useDispatch();
  const [file, setFile] = React.useState('');
  const[isLoading, setIsloading] = React.useState(false)

  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const [name, setName] = React.useState('');
  const [wins, setWins] = React.useState('');
  const [losses, setLosses] = React.useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    } 
    setOpen(false);
  };

  React.useEffect(()=> {
      if(file){
        dispatch(uploadProof(file, setUrl)).then((upload) => {
         console.log(upload);
      });
      }
  }, [file])

 
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleSubmit =  (event) => {
    event.preventDefault();
    setIsloading(true)
     const options = {
        name,
        wins,
        losses,
        url
    }
    dispatch(createTrader(options, setIsloading, setOpen))
    // setIsloading(false)
  };
  return (
    <div>
      <main className="app-py-1" style={{ height: '100vh' }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Trader Created successly !
          </Alert>
        </Snackbar>
        <div className="fade-appear-done fade-enter-done">
          <section className="container row">
            <div className="col l6 s12 offset-l3">
              <h4 className="center">Create A New Trader</h4>
              <br />
              <div className="card-panel">
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                  <div>
                      <img  src= {url} alt = "traders poc" style = {{height: 70}}/>
                    <div className="file-field input-field">
                      <div className="btn btn-secondary">
                        <span>select photo</span>
                        <input type="file" accept=".jpg,.png,.jpeg" id="proof" name="proof" onChange={handleChange} />
                      </div>
                      <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                      </div>
                    </div>
                  </div>
                  <div>
                  <div className="input-field">
                        <input
                            id="email"
                            name="name"
                            required
                            type="text"
                            value = {name}
                            onChange ={(e) =>setName(e.target.value)}
                            placeholder='Enter traders Name'
                        />
                    </div>
                    <div className="input-field">
                        <input
                            id="losses"
                            name="email"
                            required
                            type="number"
                            placeholder='Wins'
                            value = {wins}
                            onChange ={(e) =>setWins(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            id="losses"
                            name="email"
                            required
                            type="number"
                            placeholder='Losses'
                            value = {losses}
                            onChange ={(e) =>setLosses(e.target.value)}
                        />
                    </div>
                    {isLoading ? (
                      <div style={{ marginLeft: 130 }}>
                        <ReactLoading color="#107bea" />
                      </div>
                    ) : (
                      <button type="submit" className="btn btn-full">
                        Create Trader
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UploadProof;