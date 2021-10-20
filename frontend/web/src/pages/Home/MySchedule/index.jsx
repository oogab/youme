import React from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import Calendar from '../../../components/Home/Calendar/index'
import TodayEvent from '../../../components/Home/Calendar/TodayEvent/index'
import {Paper,List, ListItem} from '@material-ui/core'
import { OPEN_CREATE_EVENT_MODAL } from '../../../reducers/modal';
import AddRoutineButton from '../../../components/Routine/AddRoutineButton'
function App (props) {
  const dispatch = useDispatch()
  const { events } = useSelector((state) => state.calendar)
  //일정 추가 모달
    const openCreateEventModal=()=>{
        dispatch({type: OPEN_CREATE_EVENT_MODAL});
    }
  
    // 오늘의 일정에 해당되는 배열 새로 생성
    const todayEvent = events.filter((event)=>
    moment(moment(event.start).format('YYYY-MM-DD')).isSame(moment(moment().format('YYYY-MM-DD'))) || 
    moment(moment(event.end).format('YYYY-MM-DD')).isSame(moment(moment().format('YYYY-MM-DD'))) ||
    moment(moment().format('YYYY-MM-DD')).isBetween(moment(event.start).format('YYYY-MM-DD'), moment(event.end).format('YYYY-MM-DD'))
    ) 

  return(
    <div>
        <div className='menu daily-menu'><h3>오늘의 일정</h3><AddRoutineButton onClick={openCreateEventModal} title='일정 추가'></AddRoutineButton></div>
        
        <Paper style={{margin: '0 0 10px 0'}}>
          <List component="nav" aria-label="mailbox folders">           
              {  
                  todayEvent.length === 0 ?
                  <ListItem>오늘의 일정이 없습니다</ListItem> :
                  <>
                  {
                  todayEvent.map((event, idx) => {
                    return <TodayEvent key={idx} event={event}/>  
                  })
                  }
                  </>
              }
          </List>
        </Paper>
        <Calendar myEvent={events}/>
    </div>
  );
}

export default App;