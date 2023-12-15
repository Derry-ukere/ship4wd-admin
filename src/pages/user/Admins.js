/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import React from 'react';
import BasicTable from '../../components/AdminTable'

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { listAdminUsers } from '../../redux/slices/user';

const FundAccount = () => {
  
  const dispatch = useDispatch();
  const {  adminUsers, } = useSelector((state) => state.users);
 
  React.useEffect(() => {
    dispatch(listAdminUsers());
  },[])

  React.useEffect(() => {
    if(adminUsers){
      console.log('admin users',adminUsers)
    }
    
  },[adminUsers])


  return (
    <div>
      <main className="app-py-1" style={{ height: '100vh' }}>
        <div className="fade-appear-done fade-enter-done">
        <div className="app-relative hero-mixed">
      <div className="overlay1" />
      <div className="fade-appear-done fade-enter-done" style={{ paddingBottom: '6rem', paddingTop: '2rem' }}>
        <h1 className="center app-relative white-text">Admin Details</h1>
      </div>
    </div>
          <section className="row" style={{padding : 20}}>
            <BasicTable  users={adminUsers}/>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FundAccount;