/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SwitchComponent from '../components/Switch';

// redux
import { useDispatch } from '../redux/store';
import {   updateRange } from '../redux/slices/user';



export default function BasicTable({users}) {
  
   const [dep, setDep] = React.useState([])
   const dispatch = useDispatch()

   const [open, setOpen] = React.useState(false);
   const [userId, setUserId] = React.useState('');
   const [range, setRange] = React.useState(20);
   const [openAlert, setOpenAlert] = React.useState(false);


   const handleClickOpen = (id) => {
     setOpen(true);
     setUserId(id)
   };

   const handleClosetwo = () => {
    setOpenAlert(false);
  };
 
   const handleClose = () => {
     setOpen(false);
   };
 
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(updateRange(userId, range)).then(
      setOpenAlert(true)
    )
    handleClose()
  }

  const headers = ['First Name','Last Name','Email', 'Status','Range', 'Amount']
  React.useEffect(()=>{
    if(users){
      const cloned = users.map((users) => (
        {
          loading : false,
          deleted : false,
          firstName : users.firstName,
          lastName : users.lastName,
          email : users.email,
          range : users.range,
          id : users.uid,
          amount : users.amount,
          status : users.status || false
        }
      ))
      setDep(cloned)
    }
  },[users])


  
  return (
    <TableContainer component={Paper}>
       <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClosetwo}  anchorOrigin={{vertical : 'top', horizontal : 'right' }}>
          <MuiAlert onClose={handleClosetwo} severity="success" sx={{ width: '100%' }}>
            Range Updated 
          </MuiAlert>
       </Snackbar>
            <h3 style={{marginLeft : 10}}>Recent Users</h3>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Update transfer stop range"}
        </DialogTitle>
        <DialogContent>
        <form onSubmit={onSubmit}>
        <div className="input-field">
          <input
            id="email"
            name="email"
            required
            type="number"
            max = {100}
            placeholder='update Range'
            value = {range}
            onChange={(e) => setRange(e.target.value)}
          />
        </div>

        <Button  autoFocus type = "submit">
            update range
        </Button>

        <div>
        </div>
      </form>
        </DialogContent>
      </Dialog>

      <Table sx={{ minWidth: 650, }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key = {header} align="left">{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!dep? (
            <p>loading ..</p>
          ):
          dep.map((user, index ) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"  align="left">
                {user.firstName}
              </TableCell>
              <TableCell align="left">{user.lastName}</TableCell>
              <TableCell align="left" >{user.email}</TableCell>
              <TableCell align="left" ><SwitchComponent  id = {user.id} status = {user.status}/></TableCell>
              <TableCell align="left">{user.range}</TableCell>
              <TableCell align="left">{user.amount}</TableCell>
              <TableCell align="right"><LoadingButton  variant="outlined"  disabled = {user.deleted}  onClick = {() => handleClickOpen(user.id)}>Change Range</LoadingButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
