import * as React from 'react';
import Switch from "react-switch";


// redux
import { useDispatch } from '../redux/store';
import {   changeStatus } from '../redux/slices/users/transaction-status';


export default function SwitchLabels({id,status}) {
    const [checked, setChecked] = React.useState(status);
    const dispatch = useDispatch();


    const handleChange = (event) => {
        dispatch(changeStatus(id)).then(() => {
            setChecked((checked) => !checked)
        })
       
    };
  
    return (
        <Switch onChange={handleChange} checked={checked} />
      
    );

};
