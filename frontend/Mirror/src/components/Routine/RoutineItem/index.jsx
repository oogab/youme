import React from 'react';
import Wrapper from './styles'
import { Grid} from '@material-ui/core'
import {SET_CHOOSED_ROUTINE} from '../../../reducers/routine'
import {useDispatch} from 'react-redux'
import moment from 'moment-timezone'
function App(props){
    const dispatch = useDispatch()
    let {routine, idx} = props
    function getDay(){
        let day = moment().tz('Asia/Seoul')
        day = day.day()===0?6:day.day()-1
        return day
      }
    function getTime(time){
        let timeArr = time.split(':')
        
        let am= Math.floor(timeArr[0]/12)===0?'오전':'오후'
        let hour= timeArr[0]%12===0?12:timeArr[0]%12
        hour= hour<10?`0${hour}`:hour
        return am+' '+hour+':'+timeArr[1]
    }
    function setChoosedRoutine(){
        dispatch({
            type:SET_CHOOSED_ROUTINE,
            idx:idx,
        })
    }
    return(
        <Wrapper onClick={setChoosedRoutine} className={routine.DailyAchieveRoutines.length?'achieve-div':'no-achieve-div'}>
            <Grid container>
                <Grid item xs={6} lg={8}>
                    <h3 className={routine.DailyAchieveRoutines.length?'text achieve':'text no-achieve'}>{routine.name}</h3>
                </Grid>
                <Grid item xs={6} lg={4}>
                    <p className='text' style={{textAlign:'right'}}>{getTime(routine.RoutineActiveDays[getDay()].start_time)} 시작</p>
                </Grid>
            </Grid>
            {/* <ListItemText primary={routine.name}>
            </ListItemText>
            <ListItemSecondaryAction>
                {getTime(routine.RoutineActiveDays[getDay()].start_time)} 시작
            </ListItemSecondaryAction> */}
        </Wrapper>
    )
}
export default App