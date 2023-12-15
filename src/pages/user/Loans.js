/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import React from 'react';
import BasicTable from '../../components/Table'

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getAllDeposit, } from '../../redux/slices/deposit';

const FundAccount = () => {
  
  const dispatch = useDispatch();
  const {  allDeposit, } = useSelector((state) => state.deposit);
 
  React.useEffect(() => {
    dispatch(getAllDeposit());
  },[])

  React.useEffect(() => {
    if(allDeposit){
      console.log('allDeposit',allDeposit)
    }
    
  },[allDeposit])


  return (
    <div>
      <main className="app-py-1" style={{ height: '100vh' }}>
        <div className="fade-appear-done fade-enter-done">
        <div className="app-relative hero-mixed">
      <div className="overlay1" />
      <div className="fade-appear-done fade-enter-done" style={{ paddingBottom: '6rem', paddingTop: '2rem' }}>
        <h1 className="center app-relative white-text">Recent Loan Requests</h1>
      </div>
    </div>
          <section className="row" style={{padding : 20}}>
            <BasicTable  deposits = {allDeposit}/>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FundAccount;