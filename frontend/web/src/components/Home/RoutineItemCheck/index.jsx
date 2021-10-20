import React,{useState, useEffect} from 'react';
import Wrapper from './styles'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Checkbox
  } from '@material-ui/core';
import ProgressItem from '../ProgressItem/index';
import {connect} from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import {CHECK_ROUTINIZED_HABIT_REQUEST, SET_CHOOSED_ROUTINIZED_HABIT} from '../../../reducers/routine'
import {OPEN_CONFIRM_MODAL, SET_ALERT_MODAL_FUNCTION, OPEN_ALERT_MODAL} from '../../../reducers/modal'
function App(props){
  const dispatch = useDispatch()
  const {  routineIdx, routinizedHabitIdx } = props
  const { choosedRoutinizedHabit } = useSelector((state) => state.routine)
  const dailyAchieveHabits = props.habit.DailyAchieveHabits

  const routinizedHabit = props.habit
  const habit = props.habit.Habit
  let [time, setTime] = useState(0)

  let [timeInterval,setTimeInterval] = useState(false)

  let requiredTime = habit.time_required*60
  function isChecked(){
    if(dailyAchieveHabits!== undefined && dailyAchieveHabits.length){
      return true
    }
    return false
  }

  function handleChange(e, isExpanded){
    dispatch({type: SET_CHOOSED_ROUTINIZED_HABIT, idx:isExpanded?routinizedHabitIdx:-1})
    if(!isExpanded){
      setTimeInterval(false)
    }
  }
  

  useEffect(()=>{
      function start(){
          return setTimeout(()=>{
              setTime(time+1)
              if(time>=requiredTime) setTimeInterval(false)
          },1000)
      }
      if(isAlreadyComplete()) setTimeInterval(false)
      if(!timeInterval || isAlreadyComplete()) return undefined
      start()
      return ()=>clearTimeout(start)
  },[time, timeInterval,isAlreadyComplete,requiredTime])

  useEffect(()=>{
    if(choosedRoutinizedHabit!==routinizedHabitIdx){
      setTimeInterval(false)
    }
  },[choosedRoutinizedHabit,routinizedHabitIdx])

  function run(){
      if(isChecked()){
          dispatch({
              type: OPEN_CONFIRM_MODAL,
              message: '오늘 이미 완료한 습관입니다.'
          })
          return
      }
      if(isChecked() || isAlreadyComplete()){
          dispatch({
              type: OPEN_CONFIRM_MODAL,
              message: '이미 필요 시간을 충족하였습니다.'
          })
          return
      }
      setTimeInterval(true)
      
  }

  function stop(){
    setTimeInterval(false)
  }

  function checkRoutinizedHabit(){
      if(isChecked()){
          dispatch({
              type: OPEN_CONFIRM_MODAL,
              message: '오늘 이미 완료한 습관입니다.'
          })
          return
      }
      if(!isAlreadyComplete()) {
        dispatch({type: SET_ALERT_MODAL_FUNCTION, alertModalFunction: checkHabit})
        dispatch({type: OPEN_ALERT_MODAL, message:'아직 요구 시간을 채우지 못했습니다. 그래도 완료하시겠습니까?'})
        return
      }
      checkHabit()
  }

  function checkHabit(){
    dispatch({
      type:CHECK_ROUTINIZED_HABIT_REQUEST, 
      routineId: routinizedHabit.RoutineId, 
      habitId: routinizedHabit.HabitId, 
      routineIdx: routineIdx,
      routinizedHabitIdx: routinizedHabitIdx
    })
    setTimeInterval(false)
  }

  function isAlreadyComplete(){
      if(time< requiredTime) return false
      return true
  }
  function openNext(){
      dispatch({type: SET_CHOOSED_ROUTINIZED_HABIT, idx:routinizedHabitIdx+1})
  }

    return (
        <Wrapper>
            <Accordion className="panel routine-item-check" expanded={choosedRoutinizedHabit === routinizedHabitIdx} onChange={handleChange}>
                <AccordionSummary
                  className="check-summary"
                  aria-controls="panel1a-content"
                >
                  <h3>{habit.name}</h3>
                  <Checkbox color='primary' className='Mui-disabled' checked={isChecked()}></Checkbox>
                </AccordionSummary>
                <AccordionDetails>
                  <ProgressItem run={run} stop={stop} checkRoutinizedHabit={checkRoutinizedHabit} openNext={openNext} habit={props.habit} time={time} timeInterval={timeInterval} isAlreadyComplete={isAlreadyComplete()} checked={isChecked()}/>
                </AccordionDetails>
              </Accordion>
        </Wrapper>
    );
}
const mapStateToProps = (state) =>{
    return {
        state
    }
}
export default connect(mapStateToProps)(App);