import React from 'react';
import Wrapper from './styles'
import RoutineItem from '../RoutineItem'
import ScheduleIcon from '@material-ui/icons/Schedule';
import {Typography, List,CardContent,CardActions} from '@material-ui/core'
import CustomCard from '../CustomCard'
function App(props){
    let {myRoutines} = props
    return(
        <Wrapper>
            <CardActions className='progress-header'>
            <ScheduleIcon/>
            <Typography variant='h5'> 오늘의 루틴</Typography>
            <div style={{display:'flex'}}>
                <span style={{color:"deepskyblue"}}>■</span>
                <span>할 일</span>
                <span style={{color:"white"}}>■</span>
                <span>완료</span>
            </div>
            </CardActions>
            <CardContent className='content'>
                <List>
                {
                    myRoutines.length!==0?
                    <>
                    {
                        myRoutines.map((item, idx)=>(<RoutineItem routine={item} idx={idx} key={idx}/>))
                    }
                    </>
                    :
                    <CustomCard className='no-routine'>
                        <Typography variant='p'>오늘 진행할 루틴이 없어요.<br/>
                        웹사이트에서 루틴을 설정해주세요!
                        </Typography>
                    </CustomCard>
                }
                </List>
            </CardContent>
        </Wrapper>
    )
}
export default App