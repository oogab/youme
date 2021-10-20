import React from 'react'
import { useSelector } from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Wrapper from './styles'

const Calendar = (props) => {
  const {events} = useSelector((state) => state.calendar)
 
    return(
        <Wrapper className='demo-app'>
            <div>
           
            </div>
            <div className='demo-app-main'>
          
            <FullCalendar
                // height='auto'
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev',
                    center: 'title',
                    right: 'today next'
                }}
               
                initialView='dayGridMonth'
                locale='ko'
                dayCellContent={(info)=>{return info.date.getDate()}}
                buttonText={{today:'오늘'}}
                // editable={true}
                selectMirror={true}
                // selectable={true}
                height='500px'
                dayMaxEvents={true}
                events={events}
                // eventClick={openModifyEventModal}
                />
               
            </div>
        </Wrapper>
    )
  }

export default Calendar