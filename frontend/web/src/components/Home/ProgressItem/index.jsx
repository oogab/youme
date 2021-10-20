import React from 'react';
import {useHistory} from "react-router-dom";
import Wrapper from './styles'
import {Grid, Card, CardActions,CardContent, IconButton, Button} from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import CheckIcon from '@material-ui/icons/CheckCircle';
import NextIcon from '@material-ui/icons/SkipNext'
function App(props){
    const history = useHistory()
    const habit = props.habit.Habit
    let min = Math.floor(props.time/60)
    let sec = props.time%60

    let requiredTime = habit.time_required*60 //진짜 코드
    // let requiredTime = 5 //테스트용 코드

    let requiredMin = Math.floor(requiredTime/60)
    let requiredSec = requiredTime%60
 
    return(
        <Wrapper className='progress-item'>
            <Grid container>
                    <Grid item xs={12} md={6}>
                        <Card className='progress-content' square>
                        <CardActions className='play-btns'>
                        
                        {
                            !props.timeInterval?<IconButton color="primary" onClick={props.run}><PlayIcon className="btn progress-btn"></PlayIcon></IconButton>:<IconButton color="primary"  onClick={props.stop}><PauseIcon className="btn progress-btn"></PauseIcon></IconButton>
                        }
                            <IconButton color="primary" onClick={props.checkRoutinizedHabit} >
                            <CheckIcon className={props.isAlreadyComplete||props.checked?"btn progress-btn complete-btn":"btn progress-btn"} ></CheckIcon>
                            </IconButton>
                            <IconButton color="primary" onClick={props.openNext} >
                            <NextIcon className="btn progress-btn"></NextIcon>
                            </IconButton>
                            <span>
                            {(min<10?'0'+min:min)+':'+(sec<10?'0'+sec:sec)} / {(requiredMin<10?'0'+requiredMin:requiredMin)+':'+(requiredSec<10?'0'+requiredSec:requiredSec)}
                            </span>
                        </CardActions>
                        <div className='text-area'>
                            {habit.content}
                        </div>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {
                            habit.assist_link?
                            <div className='video-container'>
                                <iframe src={'https://www.youtube.com/embed/'+habit.assist_link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            :
                            <Card className='progress-content' square>
                                <CardContent style={{height:'77%'}}>
                                습관에 유튜브 링크를 등록하시면,<br/> 습관을 실행하면서 동영상을 감상하실 수 있습니다.
                                </CardContent>
                                <CardActions style={{height:'20%',float:'right'}}>
                                <Button color='primary' onClick={()=>{history.push('/HabitSetting')}}>바로가기</Button>
                                </CardActions>
                            </Card>
                        }
                        
                    </Grid>
            </Grid>
        </Wrapper>
    );
}
export default App;