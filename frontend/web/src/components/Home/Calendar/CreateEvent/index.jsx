import React, {useState, useCallback}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import moment from 'moment';
import {Close} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import { CLOSE_CREATE_EVENT_MODAL, OPEN_CONFIRM_MODAL, SET_ALERT_MODAL_FUNCTION, OPEN_ALERT_MODAL } from '../../../../reducers/modal';
import { CREATE_EVENT_REQUEST} from '../../../../reducers/calendar';

import { TextField } from '@material-ui/core'
import { CirclePicker } from 'react-color';

//icons
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';

import Switch from '../../../../common/Switch'
function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    overflow:'auto'
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width:400,
    backgroundColor: '#E5E3E3',
    border: '1px solid #66A091',
    boxShadow: theme.shadows[5],
    padding: '16px',
    borderRadius:'10px',
    maxWidth:'90%',
    maxHeight:'90%'
  },
  container: {
    // display: 'flex',
    flexWrap: 'wrap',
  },
  day:{
    textAlign: 'center',
    marginBottom:'10px'
  },
  text:{
    textAlign: "center",
    marginBottom: "10px"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    width: 230,
  },
  switchField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    width: 60,
  },
  inputDiv:{
    backgroundColor:'white',
    padding:'10px',
    borderRadius:'20px',
    marginBottom:'10px',
    width:'100%',
    border:'#66A091 1px solid'
  },
  buttonRight:{
    width: '100%',
    border: 'none',
    padding: '5px',
    borderRadius: '20px',
    height:'40px',
    backgroundColor: '#89DDBF',
    color:'white',
    fontWeight:'bold'
  },
  buttonDiv:{
    marginTop:'10px',
  },
  floatRight:{
    float:'right',
    color: 'lightgray',
  },
  switch:{
    marginTop: '-7px',
    
  },
  color: {
    width: '36px',
    height: '14px',
    borderRadius: '2px',
    background: '#89DDBF',
  },
  swatch: {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
    
  },
  popover: {
  
    position: 'right',
    zIndex: '1',
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    
  },
}));

function CreateCalendar(props) {
 
  const dispatch = useDispatch()
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { createEventModal } = useSelector((state) => state.modal)

//모달 닫는 함수
function handleClose() {
  dispatch({type:CLOSE_CREATE_EVENT_MODAL});
  setTitle('');
  setAllDay(true);
  setColor('#e91e63');
};
  //캘린더에 일정 추가
  const today = new Date().toISOString().replace(/T.*$/, '');

  const [title, setTitle] = useState('')
  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value)
  }, [])

  const [startDate, setStartDate] = useState(today);
  const startDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const [endDate, setEndDate] = useState(today);
  const endDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const [allDay, setAllDay] = useState(true);
  const onChangeSwitch = () =>{
    setAllDay((prev) => !prev)
  }
  
  const [click, setClick] = useState(false)
  const onChangeClick = () =>{
      setClick(true);
  }
  const onChangeClose = () => {
      setClick(false);
  }

  const [color, setColor] = useState('#e91e63')
  const onChangeColor = (color)=>{
    setColor(color.hex);
  }

  function addEvent(){
    dispatch({
      type: CREATE_EVENT_REQUEST,
      data:{
        title,
        color,
        start: startDate,
        end: endDate,
        allDay,
      }
    })
    handleClose()
    
  }

  const validate=() =>{
    if(!title){
      dispatch({
        type:OPEN_CONFIRM_MODAL,
        message: '일정을 입력해주세요.'
      })
      return false;
    } 
    if(moment.duration(moment(endDate)-moment(startDate)) < 0){
      dispatch({
        type:OPEN_CONFIRM_MODAL,
        message:'시간을 다시 설정해주세요'
      })
      return false;
    }
    else return true;
  }
  
  function setAddEvent(){
    if(validate()){
      dispatch({type: SET_ALERT_MODAL_FUNCTION, alertModalFunction: addEvent})
      dispatch({type: OPEN_ALERT_MODAL, message:'일정을 추가하시겠습니까?'})
    }
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
            <div>
           <h2 id="simple-modal-title" style={{marginBottom: "10px", float:'left'}}>일정 추가</h2><Close onClick={handleClose} style={{float:'right'}}></Close>
           </div>
           <div>
           <input type="text" placeholder="일정 입력" className={classes.inputDiv} onChange={onChangeTitle}></input>
 
            <div className={classes.inputDiv}>
              <div className={classes.inputDiv} style={{border:'none'}}>
                <span className={classes.text}>종일</span><div className={classes.floatRight}><Switch className={classes.switch} checked={allDay} onChange={onChangeSwitch}/></div>
              </div>
                {
                    allDay ? <>
                    <div className={classes.inputDiv} style={{border:'none'}}>
                      <span className={classes.text} style={{marginTop:'100px'}}>시작일</span>
                      <TextField
                          id="date"
                          type="date"
                          onChange={startDateChange}
                          defaultValue={today}
                          className={classes.textField}
                          InputLabelProps={{
                          shrink: true,
                          }}
                          style={{float: 'right', marginTop: '-5px'}}
                      />
                    </div>
                    <div className={classes.inputDiv} style={{border:'none'}}>
                      <span className={classes.text}>종료일</span>
                      <TextField
                          id="date"
                          type="date"
                          onChange={endDateChange}
                          defaultValue={today}
                          className={classes.textField}
                          InputLabelProps={{
                          shrink: true,
                          }}
                          style={{float: 'right', marginTop: '-5px'}}
                      />
                    </div>
                    </>: 
                    <>
                    <div className={classes.inputDiv} style={{border:'none'}}>
                      <span className={classes.text}>시작일</span>
                      <TextField
                          id="datetime-local"
                          type="datetime-local"
                          onChange={startDateChange}
                          className={classes.textField}
                          InputLabelProps={{
                          shrink: true,
                          }}
                          style={{float: 'right', marginTop: '-5px'}}
                      />
                    </div>
                    <div className={classes.inputDiv} style={{border:'none'}}>
                      <span className={classes.text}>종료일</span>
                      <TextField
                          id="datetime-local"
                          type="datetime-local"
                          onChange={endDateChange}
                          className={classes.textField}
                          InputLabelProps={{
                          shrink: true,
                          }}
                          style={{float: 'right', marginTop: '-5px'}}
                      />
                    </div>
                    </>
                }  
            </div>
            <div className={classes.inputDiv} style={{padding: '20px'}}>
           
              <span className={classes.text}> <LocalOfferTwoToneIcon width="100"/></span>
              {/* <div className={classes.floatRight}> */}
                <div className={ classes.swatch } onClick={ onChangeClick } onChange={onChangeColor} style={{float:'right'}}>
                    <div className={ classes.color } style={{background: color}}/>
                    </div>
                { 
                    click ? 
                    <div className={ classes.popover } style={{display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',}}>
                        <div className={ classes.cover } onClick={ onChangeClose }/>
                        <CirclePicker defaultValue={ color } onChange={ onChangeColor }/>
                    </div>: null 
                }
              {/* </div> */}
            
            </div>
          </div>
        <div className={classes.buttonDiv}>
          <button className={classes.buttonRight +' btn'} onClick = {setAddEvent}>완료</button>
        </div>
    </div>
  );

  return (
    <Modal
      open={createEventModal}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}

export default CreateCalendar;