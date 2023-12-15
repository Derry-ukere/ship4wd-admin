/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
// redux
import { useDispatch } from '../redux/store';
import { UpdateUserPassword } from '../redux/slices/user';





const UpdatePassword = () => {
  const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(false)
    const [passsword, setPassword] = React.useState('')
    const [comfirmpasssword, setComfirmPassword] = React.useState('')
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState('');

    
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    } 
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    const matched = passsword === comfirmpasssword
    if (!matched) {
      setError('Password must Match bro!')
    }else{
      const options = {
        passsword,setOpen,setIsLoading,setComfirmPassword,setPassword 
      }
      dispatch(UpdateUserPassword(options))
    }
   
  }
  return (
    <div>
<main className="container" style={{height: '100vh', marginTop : 50}}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Password Updated successly !
          </Alert>
        </Snackbar>
  <div className="fade-appear-done fade-enter-done">
    <div className="row">
      <div className="col l6 offset-l3 s12">
        <div className="card-panel">

          <center>
            <form autoComplete="off" onSubmit={handleSubmit}>
           {error &&  <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {error}
           </Alert>}
              <div className="input-field">
                  <input type="password" id="new_password" name="new_password" 
                          autoComplete="new-password"
                          required placeholder='Enter New Password'
                          value = {passsword}
                          onChange = {(e) => setPassword(e.target.value)}
                          />
             </div>
              <div className="input-field">
                  <input type="password"
                   id="confirm_new_password"
                    name="confirm_new_password" 
                    autoComplete="new-password" 
                    required placeholder='Re-Enter New Password'
                    value = {comfirmpasssword}
                    onChange = {(e) => setComfirmPassword(e.target.value)}
                    />
                  </div><br />
              <div>
                <LoadingButton type="submit" variant='contained' loading = {isLoading} fullWidth >Update</LoadingButton></div>
            </form>
          </center>
        </div>
      </div>
    </div>
  </div>
</main>
</div>
  )
}

export default UpdatePassword