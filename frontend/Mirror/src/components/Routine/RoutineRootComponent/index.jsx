import React,{useState, useEffect} from 'react';
import {Grid} from '@material-ui/core'
import RoutineList from '../RoutineList'
import RoutinizedHabitList from '../RoutinizedHabitList'
import ProgressItem from '../ProgressItem'
import {useSelector, useDispatch} from 'react-redux'
import {SET_CHOOSED_ROUTINE} from '../../../reducers/routine'
import { Fade } from '@material-ui/core';
import Wrapper from './styles';
function App(){
    let {choosedRoutine, myRoutines, choosedRoutinizedHabit} = useSelector((state)=> {return state.routine})
    const dispatch = useDispatch()
    let [zoomIn, setZoomIn] = useState(false)
    let [time, setTime] = useState(0)
    let [timeInterval,setTimeInterval] = useState(false)

    function changeZoomIn(){
        setZoomIn(true)
    }

    function changeZoomOut(){
        setZoomIn(false)
    }

    useEffect(()=>{
        function start(){
            return setTimeout(()=>{
                setTime(time+1)
            },1000)
        }
        if(!timeInterval) return undefined
        start()
        return ()=>clearTimeout(start)
    },[time, timeInterval])

    function runInterval(){
        setTimeInterval(true)
    }
    function stopInterval(){
        setTimeInterval(false)
      }
    function goBack(){
        stopInterval()
        clearTime()
        dispatch({type:SET_CHOOSED_ROUTINE, idx:-1})
    }
    function clearTime(){
        setTime(0)
    }

    return(
        <Wrapper>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                {
                    choosedRoutine==-1 || myRoutines.length<=choosedRoutine?
                    <RoutineList myRoutines={myRoutines}/>
                    :
                    <RoutinizedHabitList routine={myRoutines[choosedRoutine]} goBack={goBack} stopInterval={stopInterval} clearTime={clearTime}/>
                }
            </Grid>
            <Grid item xs={6} className={zoomIn?'progress progress-expanded':'progress'}>
                {
                    myRoutines[choosedRoutine] && myRoutines[choosedRoutine].RoutinizedHabits[choosedRoutinizedHabit]?
                    <ProgressItem 
                    choosedRoutine={choosedRoutine} 
                    choosedRoutinizedHabit={choosedRoutinizedHabit} 
                    time={time} 
                    timeInterval={timeInterval} 
                    runInterval={runInterval} 
                    stopInterval={stopInterval} 
                    clearTime={clearTime}
                    zoomIn={zoomIn}
                    changeZoomIn={changeZoomIn}
                    changeZoomOut={changeZoomOut}/>:
                    null
                    
                }
            </Grid>
        </Grid>
        </Wrapper>
    )
}
export default App