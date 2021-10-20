import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Wrapper from './styles'
import { OPEN_MODIFY_EVENT_MODAL } from '../../../reducers/modal';
import { SET_CHOOSED_EVENT_MODAL } from '../../../reducers/calendar';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

const App = (props) => {
  const dispatch = useDispatch()
  const {events} = useSelector((state) => state.calendar)
  //일정 수정 모달
  function openModifyEventModal(selectInfo){
    dispatch({type: OPEN_MODIFY_EVENT_MODAL});
    dispatch({type: SET_CHOOSED_EVENT_MODAL, data: selectInfo.event});
    // console.log(selectInfo.event.backgroundColor)
  }

    return(
        <Wrapper className='demo-app'>
                <FullCalendar
                // height='auto'
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin ]}
                headerToolbar={{
                    left: 'prev',
                    center: 'title',
                    right: 'today next'
                }}
                formatDate={{day:'numeric'}}
                expandRows= 'true'
                initialView='dayGridMonth'
                locale='ko'
                dayCellContent={(info)=>{return info.date.getDate()}}
                buttonText={{today:'오늘'}}
                editable={true}
                selectable={true}
                height='600px'
                dayMaxEvents={true}
                events={events}
                eventClick={openModifyEventModal}
                />
        </Wrapper>
    )
  }
export default App