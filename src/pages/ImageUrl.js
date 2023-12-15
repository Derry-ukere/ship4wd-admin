/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useParams,useNavigate } from 'react-router-dom';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

// redux
import { useDispatch, useSelector } from '../redux/store';
import { getDeposit } from '../redux/slices/deposit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ImageUrl = () => {
    const params = useParams();
    const {imageId} = params 
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const navigate = useNavigate();
    const handleClose = () => {
      navigate('/user/deposits')
    };

    const { singleDeposit } = useSelector((state) => state.deposit);
    const [img , setImg] = React.useState('')

    React.useEffect(() => {
      dispatch(getDeposit(imageId))
    }, [])

    React.useEffect(() => {
      if(singleDeposit){
        setImg(`${singleDeposit.proof}`)
      }
    }, [singleDeposit])
  return (
    <div>
     
     <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <img src= {`${img}`}  alt = "no proof yet" />
        </Box>
      </Modal>
    </div>
    </div>
  )
}

export default ImageUrl