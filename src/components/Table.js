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
import { useNavigate } from 'react-router-dom';



// redux
import { useDispatch } from '../redux/store';
import { updateDeposit } from '../redux/slices/deposit';


export default function BasicTable({deposits}) {
  
    const [openAlert, setOpenAlert] = React.useState(false);
    const [dep, setDep] = React.useState([])
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const OpenImage = (imageUrl) =>{
      navigate(`/user/image/${imageUrl}`)
    }

   const handleClosetwo = () => {
    setOpenAlert(false);
  };

   const UpdateStatus =(id,index) => {
    const LoadingState = [...dep];
    LoadingState[index].loading = true;
    setDep(LoadingState)

    dispatch(updateDeposit(id)).then(() => {
      const LoadedState = [...dep];
      LoadedState[index].loading = false;
      LoadedState[index].isApproved = true;
      setDep(LoadedState)
      setOpenAlert(true)
    }) 
  }

  const headers = ['Amount ($)','Amount (Crypto)','Image Proof','Clients Name', 'Status']
  React.useEffect(()=>{
    if(deposits){
      const cloned = deposits.map((deposit) => (
        {
          loading : false,
          proof : deposit.proof,
          name : deposit.name,
          amount : deposit.amount,
          amountInCrypto: deposit.amountInCrypto,
          id : deposit.id,
          isApproved: deposit.isApproved
        }
      ))
      setDep(cloned)
    }
  },[deposits])
  
  return (
    <TableContainer component={Paper}>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClosetwo}  anchorOrigin={{vertical : 'top', horizontal : 'right' }}>
          <MuiAlert onClose={handleClosetwo} severity="info" sx={{ width: '100%' }}>
            Deposit Approved 
          </MuiAlert>
       </Snackbar>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key = {header} align="right">{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!dep? (
            <p>loading ..</p>
          ):
          dep.map((deposit , index) => (
            <TableRow
              key={deposit.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {deposit.amount}
              </TableCell>
              <TableCell align="right">{deposit.amountInCrypto}</TableCell>
              <TableCell align="right" onClick={() => OpenImage(deposit.id)}><img alt = "no proof yet" src = {deposit.proof} style = {{height : 100, width: 100}}/></TableCell>
              <TableCell align="right">{deposit.name}</TableCell>
              <TableCell align="right"><LoadingButton  variant="outlined" loading = {deposit.loading} onClick = {() => UpdateStatus(deposit.id, index)}>{deposit.isApproved ? 'Approved': "Approve Deposit"}</LoadingButton> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
