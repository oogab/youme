import React,{useCallback } from 'react';
import Wrapper from './styles'
import update from 'immutability-helper';
import RoutineModalItem from '../RoutineModalItem/index'
import { useSelector, useDispatch} from 'react-redux';
import {SET_ROUTINIZED_HABITS} from '../../../reducers/routine'

function App(props){
  const { myRoutines } = useSelector((state) => state.routine) 
  const dispatch = useDispatch()
  const { num } = props
    let routinizedHabit = myRoutines[num].RoutinizedHabits

    const moveCard = useCallback( 
    (dragIndex, hoverIndex) => {
      const dragRoutinizedHabit = routinizedHabit[dragIndex];
    
      dispatch({
        type:SET_ROUTINIZED_HABITS,
        num,
        RoutinizedHabits:update(routinizedHabit, {
            $splice: [
              [dragIndex, 1], 
              [hoverIndex, 0, dragRoutinizedHabit], // Add
            ],
          })
      })
    },
    [routinizedHabit, dispatch, num]
  );

    return(
        <Wrapper>
            {
                routinizedHabit !== undefined && routinizedHabit.length ?
                <>
                {
                routinizedHabit.map((item, index) => (
                    <RoutineModalItem key={item.id} index={index} id={item.id} moveCard={moveCard} num={num} itemIdx={index} nowItem={item}/>
                  ))
                }
                </>:
                <div className="default-box">루틴 일정을 추가해주세요.</div>
            }
        </Wrapper>
    );
}

export default App;