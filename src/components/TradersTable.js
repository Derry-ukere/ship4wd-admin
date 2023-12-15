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
import { deleteTraders } from '../redux/slices/user';



export default function BasicTable({users}) {    
    const [dep, setDep] = React.useState([])
    const dispatch = useDispatch();


    const deleteAdmin = (id, index)=> {
        const LoadedState = [...dep];
        LoadedState[index].loading = true;
        setDep(LoadedState)
        dispatch(deleteTraders(`${id}`)).then(() => {
            const LoadedState = [...dep];
            LoadedState[index].loading = false;
            LoadedState[index].deleted = true;
            setDep(LoadedState)
        })
    }

  const headers = ['Name','Image',]
  React.useEffect(()=>{
    if(users){
      const cloned = users.map((users) => (
        {
          loading : false,
          deleted : false,
          firstName : users.name,
          imageUrl: users.imageUrl,
          id : users.id, 
        }
      ))
      console.log('cloned', cloned)
      setDep(cloned)
    }
  },[users])

  const downloadFile = (link) => {
    window.location.href = `${link}`
  }

  
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
          dep.map((user, index) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"  align="left">
                {user.firstName}
              </TableCell>
              <TableCell align="center" onClick={() => downloadFile(user.backView)}><img alt = "no ID" src = {user.imageUrl} style = {{height : 100, width: 100}}/></TableCell>
              <TableCell align="center"><LoadingButton  variant="outlined"  disabled = {user.deleted} loading = {user.loading} onClick = {() => deleteAdmin(user.id, index)}>{user.deleted ? 'Deleted': "Delete Trader"}</LoadingButton> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
