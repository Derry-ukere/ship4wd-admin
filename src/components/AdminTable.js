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


export default function BasicTable({users}) {    
    const [dep, setDep] = React.useState([])

  const headers = ['Fisrt Name','Last Name','Email']
  React.useEffect(()=>{
    if(users){
      console.log('users', users)
      const cloned = users.map((users) => (
        {
          loading : false,
          deleted : false,
          firstName : users.firstName,
          lastName : users.lastName,
          email: users.email,
          id : users.uid, 
        }
      ))
      console.log('list users', cloned)
      setDep(cloned)
    }
  },[users])

  
  return (
    <TableContainer component={Paper}>
            <h3 style={{marginLeft : 10}}>Administrators</h3>
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
              <TableCell align="left">{user.lastName}</TableCell>
              <TableCell align="left">{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
