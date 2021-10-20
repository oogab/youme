import React from 'react';
import DaumPostcode from 'react-daum-postcode'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_ADDRESS_MODAL, SET_ADDRESS_INFO } from '../../../reducers/modal';
function getModalStyle() {
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: '#E5E3E3',
      border: '1px solid #66A091',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius:'10px',
      maxWidth:'90%',
      maxHeight:'90%'
    },
  }));
  
  function Postcode() {
      const { addressModal } = useSelector((state) => state.modal)
      const dispatch = useDispatch()
      const classes = useStyles();
      // getModalStyle is not a pure function, we roll the style only on the first render
      const [modalStyle] = React.useState(getModalStyle);
  
      //   const { choosedRoutine, myRoutines } = useSelector((state) => state.routine)
  
      const handleComplete=(data)=>{
        dispatch({type:SET_ADDRESS_INFO, data:data})
      }
    //모달 닫는 함수
    function closeModal(){
      dispatch({
        type: CLOSE_ADDRESS_MODAL
      })
    }

    const body = (
      <div style={modalStyle} className={classes.paper}>
          <DaumPostcode
            onComplete={handleComplete}/>
      </div>
    );
  
    return (
      <Modal
          open={addressModal}
          onClose={closeModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
    );
  }
export default Postcode;