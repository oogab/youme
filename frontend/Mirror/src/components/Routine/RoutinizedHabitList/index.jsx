import React from 'react';
import Wrapper from './styles'
import RoutinizedHabitItem from '../RoutinizedHabitItem'
import {Typography, List,CardContent,CardActions} from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CustomCard from '../CustomCard'
function App(props){
    let {routine, goBack} = props
    return(
        <Wrapper>
            <CardActions className='progress-header'>
            <ArrowBackIosIcon className='btn' onClick={goBack}/>
            <Typography variant='h5'>{routine.name}</Typography>
            </CardActions>
                <CardContent className='content'>
                <List>
                    {
                        routine.RoutinizedHabits.length!==0?
                        <>
                        {
                            routine.RoutinizedHabits.map((item,idx)=>(
                                <RoutinizedHabitItem idx={idx} key={idx} routinizedHabit={item} stopInterval={props.stopInterval} clearTime={props.clearTime}/>
                            ))
                        }
                        </>
                        :
                        <CustomCard className='no-routine'>
                            <Typography variant='p'>
                            루틴 내 습관이 없어요!<br/>
                            웹사이트에서 습관을 설정해주세요.
                            </Typography>
                        </CustomCard>
                    }
                </List>
            </CardContent>
        </Wrapper>
    )
}
export default App