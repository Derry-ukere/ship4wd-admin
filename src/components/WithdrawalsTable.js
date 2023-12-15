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

// redux
import { useDispatch } from '../redux/store';
import { approvedDeposit } from '../redux/slices/user';



export default function BasicTable({withdraws,}) {    
    const [dep, setDep] = React.useState([])
    const dispatch = useDispatch();

    const deleteAdmin = (id, index)=> {
        const LoadedState = [...dep];
        LoadedState[index].loading = true;
        setDep(LoadedState)
        dispatch(approvedDeposit(`${id}`)).then(() => {
            const LoadedState = [...dep];
            LoadedState[index].loading = false;
            LoadedState[index].approved = true;
            setDep(LoadedState)
        })
    }

  const headers = ['Amount','Payment Method', 'user', 'Wallet Id']
  React.useEffect(()=>{
    if(withdraws){
      const cloned = withdraws.map((withdraw) => (
        {
          loading : false,
          approved : withdraw.isApproved,
          amount : withdraw.amount,
          payment: withdraw.paymentMethod,
          walletId:withdraw.walletAddress,
          id : withdraw.id, 
          user : withdraw.user
        }
      ))
      console.log('withdrawals', cloned)
      setDep(cloned)
    }
  },[withdraws])

  
  return (
    <TableContainer component={Paper}>
            <h3 style={{marginLeft : 10}}>Traders</h3>
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
          dep.map((withdraw, index) => (
            <TableRow
              key={withdraw.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"  align="left">
                {withdraw.amount}
              </TableCell>
              <TableCell align="center" >
                  {withdraw.payment}
              </TableCell>
              <TableCell align="center" >
                  {withdraw.user}
              </TableCell>
              <TableCell align="center" >
                  {withdraw.walletId}
              </TableCell>
              <TableCell align="center"><LoadingButton  variant="outlined"  disabled = {withdraw.approved} loading = {withdraw.loading} onClick = {() => deleteAdmin(withdraw.id, index)}>{withdraw.approved ? 'Approved': "Approve Withdraw"}</LoadingButton> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
