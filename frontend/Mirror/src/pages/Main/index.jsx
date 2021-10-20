import React, { useState, useEffect } from 'react';
import Wrapper from './styles';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import Clock from '../../components/Clock';
import Weather from '../../components/Weather/WeatherWidget'
import RoutineRootComponent from '../../components/Routine/RoutineRootComponent'
import ChallengeList from '../../components/Challenge/ChallengeList/'
import SettingButtons from '../../components/Etc/SettingButtons'
import {
   Grid,
   List,
   ListItem,
   Typography,
   Fade
  } from '@material-ui/core';
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import { advice } from '../../config/config';
import 'react-calendar/dist/Calendar.css';
import {LOAD_TODAY_ROUTINES_REQUEST} from '../../reducers/routine'
import {LOAD_MY_CHALLENGES_REQUEST} from '../../reducers/challenge'
//달력&일정
import CustomCalendar from '../../components/Calendar/index';
import TodayEvent from '../../components/TodayEvent/index';
import { LOAD_EVENT_REQUEST } from '../../reducers/calendar';
import {SnackbarProvider} from 'notistack'

const Main = props => {
  let today = new Date()
  let msg = advice(today.getDate()%10)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch({type:LOAD_TODAY_ROUTINES_REQUEST})
    dispatch({type: LOAD_EVENT_REQUEST})
    dispatch({
      type: LOAD_MY_CHALLENGES_REQUEST
    })
  },[dispatch])
  const { events } = useSelector((state) => state.calendar)

  const [routineVisible, setRoutineVisible] = useState(true);
  const [challengeVisible, setChallengeVisible] = useState(true);

  const routineHandleChange = () => {
    setRoutineVisible((prev) => !prev);
  };

  const challengeHandleChange = () =>{
    setChallengeVisible((prev) => !prev);
  }

  const todayEvent = events.filter((event)=>
    moment(moment(event.start).format('YYYY-MM-DD')).isSame(moment(moment().format('YYYY-MM-DD'))) || 
    moment(moment(event.end).format('YYYY-MM-DD')).isSame(moment(moment().format('YYYY-MM-DD'))) ||
    moment(moment().format('YYYY-MM-DD')).isBetween(moment(event.start).format('YYYY-MM-DD'), moment(event.end).format('YYYY-MM-DD'))
    ) 

  
  return (
    <SnackbarProvider maxSnack={2}
    TransitionComponent={Fade}
    >
        <Wrapper>
          
          

          <Grid container spacing={2}>
            {/* 왼쪽 9 */}
            <Grid container item xs={9} spacing={0}>
              {/* 날씨*/}
              <Grid item xs={12}>
                <Weather/>
              </Grid>
              {/* 빈공간 */}
              <Grid container item xs={12} spacing={0} style={{height:'22px'}}></Grid>
              {/* 챌린지 */}
              <Grid item xs={12}>
                <Fade in={challengeVisible} >
                  <div>
                  <ChallengeList msg={msg}/>
                  </div>
                </Fade>
              </Grid>
               {/* 아래쪽으로 맞출 공간 */}
              <Grid container item xs={12} spacing={0} style={{height:'22px'}}></Grid>
              {/* 루틴 */}
              <Grid item xs={8} className="routine">
                <Fade in={routineVisible}>
                  <div>
                    <RoutineRootComponent/>
                  </div>
                </Fade>
              </Grid>
              <Grid item xs={4} className="routine"></Grid>
            </Grid>

            {/* 오른쪽 3 */}
            <Grid container item xs={3} spacing={0}>
              {/* 시계 */}
              <Grid item xs={12}  >
                <Clock/>
                <br></br>
              </Grid>
              <Grid item xs={12}  >
                <SettingButtons routineHandleChange={routineHandleChange} routineVisible={routineVisible} challengeHandleChange={challengeHandleChange} challengeVisible={challengeVisible}/>
              </Grid>
              {/* 아래쪽으로 맞출 공간 */}
              <Grid container item xs={12} spacing={0} style={{height:'104px'}}></Grid>
              <Grid item xs={12}>
                <Typography variant='h5'>오늘의 일정</Typography>
                <List className="listScroll" component="nav" aria-label="mailbox folders"
                style={{ maxHeight: '100px'}}>           
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
              </Grid>
              {/* 아래쪽으로 맞출 공간 */}
              <Grid container item xs={12} spacing={0} style={{height:'50px'}}></Grid>
              {/* 달력 */}
              <Grid item xs={12}>
               <CustomCalendar myEvent={events}/>
              </Grid>
            </Grid>
          </Grid>
        </Wrapper>
      </SnackbarProvider>
    
  );
};

export default Main;

