import React,{useState} from 'react';
import Wrapper from './styles'
import {Typography, CardContent, CardActions, Tabs, Tab, IconButton, Grid} from '@material-ui/core'
import YouTubeIcon from '@material-ui/icons/YouTube';
import NoteIcon from '@material-ui/icons/Note';
import PlayIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import CheckIcon from '@material-ui/icons/CheckCircleOutline'
import NextIcon from '@material-ui/icons/SkipNext'
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import {SET_CHOOSED_ROUTINIZED_HABIT, CHECK_ROUTINIZED_HABIT_REQUEST} from '../../../reducers/routine'
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
function App(props){
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch()
    let [tabValue, setTabValue] = useState(0)
    let {choosedRoutine, choosedRoutinizedHabit, zoomIn, changeZoomIn, changeZoomOut} = props
    let {myRoutines} = useSelector((state)=>{return state.routine})
    const routinizedHabit = myRoutines[choosedRoutine].RoutinizedHabits[choosedRoutinizedHabit]
    const habit = routinizedHabit.Habit
    const dailyAchieveHabits = routinizedHabit.DailyAchieveHabits
    let {time,timeInterval} = props
    let min = Math.floor(time/60)
    let sec = time%60

    let requiredTime = habit.time_required*60

    let requiredMin = Math.floor(requiredTime/60)
    let requiredSec = requiredTime%60
    function isChecked(){
        if(dailyAchieveHabits!== undefined && dailyAchieveHabits.length){
        return true
        }
        return false
    }

    function run(){
        if(isChecked()){
            enqueueSnackbar('오늘 이미 완료한 습관입니다.',{variant:'warning'});
            return
        }else if(isChecked() || isAlreadyComplete()){
            enqueueSnackbar('이미 필요 시간을 충족하였습니다.',{variant:'info'});
            return
        }
        props.runInterval()
        
    }
  
    function stop(){
      props.stopInterval()
    }
  
    function checkRoutinizedHabit(){
        if(isChecked()){
            enqueueSnackbar('오늘 이미 완료한 습관입니다.',{variant:'warning'});
            return
        }
        checkHabit()
        
    }
  
    function checkHabit(){
      dispatch({
        type:CHECK_ROUTINIZED_HABIT_REQUEST, 
        routineId: routinizedHabit.RoutineId, 
        habitId: routinizedHabit.HabitId, 
        routineIdx: choosedRoutine,
        routinizedHabitIdx: choosedRoutinizedHabit
      })
      enqueueSnackbar('습관이 완료되었습니다.',{variant:'success'});
      props.stopInterval()
    }
  
    function isAlreadyComplete(){
        if(time< requiredTime) return false
        return true
    }
    function openNext(){
        props.stopInterval()
        props.clearTime()
        dispatch({type: SET_CHOOSED_ROUTINIZED_HABIT, idx:choosedRoutinizedHabit+1})
    }

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };
    return(
        <Wrapper>
            <CardActions className='progress-header'>
            <Typography variant='h5'>{habit.name}</Typography>
            {zoomIn?<ZoomOutIcon onClick={changeZoomOut} className='btn'/>:<ZoomInIcon onClick={changeZoomIn} className='btn'/>}
            </CardActions>
            <CardContent className='progress-article'>
                <div className='video-container content-container' hidden={tabValue !== 0}>
                <Typography className='content-typography'>{habit.content}</Typography>
                </div>
                <div className='video-container' hidden={tabValue !== 1}>
                    {
                        habit.assist_link?
                        <iframe src={"https://www.youtube.com/embed/"+habit.assist_link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen"></iframe>
                        :
                        <Typography className='content-typography'>웹사이트에서 유튜브 링크를 습관에 등록해주세요.</Typography>
                    }
                
                </div>
            </CardContent>
            <CardActions className='progress-footer'>
                <Grid item xs={4}>
                    <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        variant="fullWidth"
                    >
                        <Tab className={tabValue !==0?'no-active-tab':'active-tab'} icon={<NoteIcon />} />
                        <Tab className={tabValue !==1?'no-active-tab':'active-tab'} icon={<YouTubeIcon />}  />
                    </Tabs>
                </Grid>
                <Grid item xs={3}>
                    {(min<10?'0'+min:min)+':'+(sec<10?'0'+sec:sec)} / {(requiredMin<10?'0'+requiredMin:requiredMin)+':'+(requiredSec<10?'0'+requiredSec:requiredSec)}
                </Grid>
                <Grid item xs={5}>
                    {
                        !timeInterval?
                        <IconButton color="primary" onClick={run}><PlayIcon className="btn progress-btn"></PlayIcon></IconButton>
                        :
                        <IconButton color="primary" onClick={stop}><PauseIcon className="progress-btn"></PauseIcon></IconButton>
                    }
                    <IconButton color="primary" onClick={checkRoutinizedHabit}>
                        <CheckIcon className={true?"btn progress-btn complete-btn":"btn progress-btn"}></CheckIcon>
                    </IconButton>
                    <IconButton color="primary" onClick={openNext}>
                        <NextIcon className="btn progress-btn"></NextIcon>
                    </IconButton>
                </Grid>
            </CardActions>
        </Wrapper>
    )
}
export default App