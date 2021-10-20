import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useSelector, useDispatch } from 'react-redux';
import {Close} from '@material-ui/icons';
import {CLOSE_MODIFY_HABIT_MODAL, OPEN_ALERT_MODAL, OPEN_CONFIRM_MODAL, SET_ALERT_MODAL_FUNCTION} from '../../../reducers/modal'
import {SET_MODIFY_HABIT_NAME, SET_MODIFY_HABIT_CONTENT, SET_MODIFY_HABIT_TIME_REQUIRED, MODIFY_MY_HABIT_REQUEST, ADD_JUST_HABIT_REQUEST, SET_MODIFY_HABIT_ASSIST_LINK} from '../../../reducers/habit'
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
  routineItemList:{
    marginBottom:'60px',
  },
  input:{
    border:'#66A091 1px solid',
    fontFamily: 'auto',
    width: '100%',
    height:'40px',
    borderRadius: '5px',
    padding: '20px',
    resize:'none',
    outline:'none',
    marginBottom: "10px",
    backgroundColor: 'white',
  },
  textArea:{
    height:'80px',
  },
  buttonLeft:{
    width: '47.5%',
    marginRight: '2.5%',
    border: 'none',
    padding: '5px',
    borderRadius: '20px',
    height:'40px',
    backgroundColor: '#776D61',
    color:'white',
    fontWeight:'bold'
  },
  buttonRight:{
    width: '100%',
    border: 'none',
    padding: '5px',
    borderRadius: '20px',
    height:'40px',
    backgroundColor: '#776D61',
    color:'white',
    fontWeight:'bold'
  },
  buttonDiv:{
  },
  habitBtn:{
    textAlign : 'center',
    margin: '10px',
    padding: '20px'
  },
  habitIcon:{
    width: '100%',
    height: '50px',
    display: 'block'
  }
}));

function SimpleModal(props) {
    const { modifyHabitModal } = useSelector((state) => state.modal)
    const {habitInfo} = useSelector((state) => state.habit)
    const dispatch = useDispatch()
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    //   const { choosedRoutine, myRoutines } = useSelector((state) => state.routine)

  //모달 닫는 함수
  function closeModal(){
    dispatch({
      type: CLOSE_MODIFY_HABIT_MODAL
    })
  }

  //습관 수정 함수
  function modifyHabit(){
      if(habitInfo.id===-1){
        dispatch({
          type: ADD_JUST_HABIT_REQUEST,
          data: {
            name: habitInfo.name,
            content: habitInfo.content,
            "time_required": habitInfo.time_required,
            assist_link:setLink(habitInfo.assist_link)
          }
        })
      }else{
        dispatch({
          type: MODIFY_MY_HABIT_REQUEST,
          data: {
            name: habitInfo.name,
            content: habitInfo.content,
            "time_required": habitInfo.time_required,
            assist_link:setLink(habitInfo.assist_link)
          },
          id: habitInfo.id
        })
      }
      closeModal()
  }

  function setModifyHabit(){
    if(validate()){
      dispatch({type: SET_ALERT_MODAL_FUNCTION, alertModalFunction: modifyHabit})
      if(habitInfo.id===-1){
        dispatch({type: OPEN_ALERT_MODAL, message:'습관을 생성하시겠습니까?'})
      }else{
        dispatch({type: OPEN_ALERT_MODAL, message:'습관을 수정하시겠습니까?'})
      }
    }
  }

  function setLink(text){
    text = text.replace('https://','')
    text = text.replace('http://','')
    text = text.replace('www.youtube.com/watch?v=','')
    text = text.replace('www.youtube.com/watch?v=','')
    text = text.replace('youtu.be/','')
    text = text.replace('www.youtube.com/embed/','')

    return text
  }

  const validate = () =>{
    let titlesKorean = ['습관 이름을','내용을', '소요 시간을']
    let titlesEnglish =[habitInfo.name, habitInfo.content, habitInfo.time_required]
    for(let i=0;i<titlesKorean.length;i++){
      if(!titlesEnglish[i]){
        dispatch({
          type:OPEN_CONFIRM_MODAL,
          message:titlesKorean[i]+' 입력해주세요'
        })
        return false;
      }
    }
    return true;
  }

  function changeName(e){
    dispatch({type: SET_MODIFY_HABIT_NAME, name:e.target.value})
  }

  function changeContent(e){
    dispatch({type: SET_MODIFY_HABIT_CONTENT, content:e.target.value})
  }

  function changeTimeRequired(e){
    dispatch({type: SET_MODIFY_HABIT_TIME_REQUIRED, time_required:e.target.value})
  }

  function changeLink(e){
    dispatch({type: SET_MODIFY_HABIT_ASSIST_LINK, assist_link:e.target.value})
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
        <div style={{height:'30px', marginBottom: '10px'}}>
        <h2 id="simple-modal-title" style={{float:'left'}}>{habitInfo.id===-1?'습관 추가하기':'습관 수정하기'}</h2>
        <Close style={{ float:'right'}} onClick={closeModal}></Close>
        </div>
        <input placeholder='제목' className={classes.input} onChange={changeName} defaultValue={habitInfo.name} style={{fontFamily: 'SCDream4'}}></input>
        <textarea className={classes.textArea+' '+classes.input} placeholder='내용' onChange={changeContent} defaultValue={habitInfo.content} maxLength='100' style={{fontFamily: 'SCDream4'}}></textarea>
        <input className={classes.input} type="number" onChange={changeTimeRequired} placeholder='분' defaultValue={habitInfo.time_required} min='1' max='50'  style={{fontFamily: 'SCDream4'}}/>
        <textarea onChange ={changeLink} className={classes.textArea+' '+classes.input} placeholder='유튜브 링크' maxLength='50'  style={{fontFamily: 'SCDream4'}}defaultValue={habitInfo.assist_link?'https://www.youtube.com/embed/'+habitInfo.assist_link:''}></textarea>
        
        <div className={classes.buttonDiv}>
            <button className={classes.buttonRight} onClick={setModifyHabit}>저장</button>
          </div>
    </div>
  );

  return (
    <Modal
        open={modifyHabitModal}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
  );
}

export default SimpleModal;