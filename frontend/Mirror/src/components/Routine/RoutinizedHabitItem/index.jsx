import React from 'react';
import Wrapper from './styles'
import {Checkbox, Grid} from '@material-ui/core'
import {SET_CHOOSED_ROUTINIZED_HABIT} from '../../../reducers/routine'
import { useDispatch, useSelector } from 'react-redux';
function App(props){
    const dispatch = useDispatch()
    let {choosedRoutinizedHabit} = useSelector((state)=>{return state.routine})
    let {idx, routinizedHabit} = props
    
    function setChoosedRoutinizedHabit(){
        props.stopInterval()
        props.clearTime()
        if(choosedRoutinizedHabit!==idx){
            dispatch({type: SET_CHOOSED_ROUTINIZED_HABIT, idx:idx})
        }else{
            dispatch({type: SET_CHOOSED_ROUTINIZED_HABIT, idx:-1})
        }
    }
    return(
        <Wrapper onClick={setChoosedRoutinizedHabit}>
            <Grid container>
                <Grid item xs={9} md={10} xl={11}>
                    <h3 className='habit-name'>{routinizedHabit.Habit.name}</h3>
                </Grid>
                <Grid item xs={3} md={2} xl={1} style={{lineHeight:'58px'}}>
                    <Checkbox
                    checked={routinizedHabit.DailyAchieveHabits.length===0?false:true}
                    disabled
                    />
                </Grid>
            </Grid>
        </Wrapper>
    )
}
export default App