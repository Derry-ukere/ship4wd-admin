/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import React from 'react';
import BasicTable from '../components/TradersTable'

// redux
import { useDispatch, useSelector } from '../redux/store';
import { listTraders, } from '../redux/slices/user';

const FundAccount = () => {
  
  const dispatch = useDispatch();
  const {  traders } = useSelector((state) => state.users);
 
  React.useEffect(() => {
    dispatch(listTraders());
  },[])

  React.useEffect(() => {
    if(traders){
      console.log('trado',traders)
    }
    
  },[traders])


  return (
    <div>
      <main className="app-py-1" style={{ height: '100vh' }}>
        <div className="fade-appear-done fade-enter-done">
        <div className="app-relative hero-mixed">
      <div className="overlay1" />
      <div className="fade-appear-done fade-enter-done" style={{ paddingBottom: '6rem', paddingTop: '2rem' }}>
        <h1 className="center app-relative white-text">Traders Details</h1>
      </div>
    </div>
          <section className="row" style={{padding : 20}}>
            <BasicTable  users = {traders}/>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FundAccount;