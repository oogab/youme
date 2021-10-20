import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {connect, useDispatch, useSelector} from 'react-redux';
import { CLOSE_ROUTINE_MODAL, OPEN_ALERT_MODAL, OPEN_CONFIRM_MODAL, SET_ALERT_MODAL_FUNCTION } from '../../../reducers/modal';
import { ADD_MY_HABIT_REQUEST} from '../../../reducers/habit';
import { ADD_ROUTINIZED_HABIT_REQUEST, LOAD_MY_ROUTINES_REQUEST } from '../../../reducers/routine';
import {Paper, Grid, Card, CardContent} from '@material-ui/core';
import {Create, Event, Close} from '@material-ui/icons';
import Habit from '../Habit/';
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
    maxHeight:'90%',
    overflow: "auto",
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
    width: '47.5%',
    marginLeft: '2.5%',
    border: 'none',
    padding: '5px',
    borderRadius: '20px',
    height:'40px',
    backgroundColor: '#89DDBF',
    color:'white',
    fontWeight:'bold'
  },
  buttonDiv:{
    marginTop:'20px',
  },
  habitBtn:{
    textAlign : 'center',
    margin: '10px',
    padding: '10px'
  },
  habitIcon:{
    width: '100%',
    height: '50px',
    display: 'block'
  },
  width50:{
    width:'50%',
  }
}));

function SimpleModal(props) {
  const { routineModal } = useSelector((state) => state.modal)
  const { choosedRoutine, myRoutines } = useSelector((state) => state.routine)
  const {myHabits} = useSelector((state) => state.habit)
  const dispatch = useDispatch()
  let [title,setTitle] = useState('');
  let [content,setContent] = useState('');
  let [link,setLink] = useState('');
  let [time,setTime] = useState(1);

  let [newHabit, setNewHabit] = useState(false);
  let [existHabit, setExistHabit] = useState(false);
  let [clickedHabit, setClickedHabit] = useState(0);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  function initState(){
    setTitle('')
    setContent('')
    setTime(1)
    setLink('')
  }
  //모달 닫는 함수
  function closeRoutine(){
    dispatch({
      type: CLOSE_ROUTINE_MODAL
    })
    initState()
    goBack()
  }

  //습관 추가 함수
  function addHabit(){
      dispatch({
        type: ADD_MY_HABIT_REQUEST,
        data: {
          name: title,
          content,
          "time_required": time,
          assist_link:filterLink(link)
        }
      })
      closeRoutine()
  }

  function setAddHabit(){
    if(validate()){
      dispatch({type: SET_ALERT_MODAL_FUNCTION, alertModalFunction: addHabit})
      dispatch({type: OPEN_ALERT_MODAL, message:'습관을 생성하시겠습니까?'})
    }
  }

  function connectRoutinizedHabit(habitId){
    dispatch({
      type: ADD_ROUTINIZED_HABIT_REQUEST,
      data: {
        "order": myRoutines[choosedRoutine].RoutinizedHabits.length,
        "achieve_count": 0,
        habitId
      },
      id:myRoutines[choosedRoutine].id,
      name: myHabits[clickedHabit].name
    })
    dispatch({
      type: LOAD_MY_ROUTINES_REQUEST,
    })
    closeRoutine()
  }
  function goBack(){
    setNewHabit(false);
    setExistHabit(false);
  }

  const validate = () =>{
    let titlesKorean = ['습관 이름을','내용을', '소요 시간을']
    let titlesEnglish =[title, content, time]
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

  function filterLink(text){
    text = text.replace('https://','')
    text = text.replace('http://','')
    text = text.replace('www.youtube.com/watch?v=','')
    text = text.replace('www.youtube.com/watch?v=','')
    text = text.replace('youtu.be/','')
    text = text.replace('www.youtube.com/embed/','')

    return text
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{height:'30px'}}>
      <h2 id="simple-modal-title" style={{float:'left'}}>습관 추가하기</h2>
      <Close onClick={closeRoutine} style={{ float:'right'}}></Close>
      </div>
      {
        !newHabit && !existHabit?
        <Grid container >
          <Grid item md={6} sm={6} className={classes.width50}>
            <Paper className={classes.habitBtn+' btn'} onClick={()=>{setNewHabit(true)}}>
            <Create className={classes.habitIcon} style={{color:'tan'}}></Create>
            새로운 습관
            </Paper>
          </Grid>
          <Grid item md={6} sm={6} className={classes.width50}>
            <Paper className={classes.habitBtn+' btn'} onClick={()=>{setExistHabit(true)}}>
            <Event className={classes.habitIcon} style={{color:'lightgray'}}></Event>
            기존 습관
            </Paper>
          </Grid>
        </Grid>
        :null
      }
      {
        newHabit?
        <>
        <input onChange={(e)=>{setTitle(e.target.value)}} placeholder='제목' className={classes.input} maxLength='50'></input>
        <textarea onChange ={(e)=>{setContent(e.target.value)}} className={classes.textArea+' '+classes.input} placeholder='내용' maxLength='100'></textarea>
        <input className={classes.input} type="number" onChange ={(e)=>{setTime(e.target.value)}} placeholder='분' defaultValue={time} min='1' max='50'/>
        <textarea onChange ={(e)=>{setLink(e.target.value)}} className={classes.textArea+' '+classes.input} placeholder='유튜브 링크' maxLength='50'></textarea>
        <div className={classes.buttonDiv}>
            <button className={classes.buttonLeft} onClick={goBack}>뒤로가기</button>
            <button className={classes.buttonRight} onClick={setAddHabit}>저장</button>
          </div>
        </>:
        null
      }
      {
        existHabit?
        <>
        <div >
          {
            myHabits.length!==0?
            <>
            {
              myHabits.map((item, idx) =>(<Habit key ={idx} habit={item} clickedHabit={clickedHabit} idx={idx} onClick={()=>{setClickedHabit(idx)}}></Habit>))
            }
            </>:
            <Card>
            <CardContent>
                <h4 className='text-title'>
                    등록되어 있는 습관이 없어요.
                </h4>
            </CardContent>
            </Card>
          }
        
        </div>
        <div className={classes.buttonDiv}>
            <button className={classes.buttonLeft} onClick={goBack}>뒤로가기</button>
            <button className={classes.buttonRight} onClick={()=>{connectRoutinizedHabit(myHabits[clickedHabit].id)}}>저장</button>
          </div>
        </>
        :null
      }
    </div>
  );

  return (
    <Modal
        open={routineModal}
        onClose={closeRoutine}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
  );
}

const mapStateToProps = (state) =>{
  return {
      state
  }
}
export default connect(mapStateToProps)(SimpleModal);