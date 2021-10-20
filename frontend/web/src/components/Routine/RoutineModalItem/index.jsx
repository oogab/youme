import React,{ useRef } from 'react';
import Wrapper from './styles'
import {useDispatch, useSelector} from 'react-redux';
import {DELETE_ROUTINIZED_HABIT_REQUEST} from '../../../reducers/routine';
import { useDrag, useDrop } from 'react-dnd';

function App(props){
    const ref = useRef(null);
    let { id, index, moveCard } = props

    const [, drop] = useDrop({ 
        accept: 'Card',
        hover(item, monitor) {
          if (!ref.current) {
            return;
          }
    
          const dragIndex = item.index;
          const hoverIndex = index;
    
          if (dragIndex === hoverIndex) {
            return;
          }
    
          const hoverBoundingRect = ref.current?.getBoundingClientRect();
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const clientOffset = monitor.getClientOffset();
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }
    
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }
    
          moveCard(dragIndex, hoverIndex);
          item.index = hoverIndex;
        },
      });
      const [{ isDragging }, drag] = useDrag({ 
        type:'Card',
        item: { type: 'Card', id, index },
        collect: monitor => ({
          isDragging: monitor.isDragging(),
        }),
      });
    
      drag(drop(ref));

    let dispatch = useDispatch();
    let {myRoutines} = useSelector((state) => state.routine);
    //삭제하는 함수
    function deleteToDoItem(){
        dispatch({type:DELETE_ROUTINIZED_HABIT_REQUEST, id: props.nowItem.id ,routineIdx: props.num , routineItemIdx: props.itemIdx})
    }
    return(
        <Wrapper ref={ref} isDragging={isDragging}>
            <span className="toDoItem">{myRoutines[props.num].RoutinizedHabits[props.itemIdx].Habit.name}</span><span className="minus btn" onClick={deleteToDoItem}>ㅡ</span>
        </Wrapper>
    );
}
export default App;