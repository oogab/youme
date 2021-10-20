import React from 'react';
import Wrapper from './styles'
import {Card, CardContent, Typography, CardActions, Grid, Button} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux'
import {OPEN_MODIFY_HABIT_MODAL, SET_ALERT_MODAL_FUNCTION, OPEN_ALERT_MODAL} from '../../../reducers/modal'
import {SET_MODIFY_HABIT_MODAL, DELETE_MY_HABIT_REQUEST} from '../../../reducers/habit'
function App(props){
  const dispatch = useDispatch()
  const { myHabits } = useSelector((state) => state.habit)
  function openModal(){
      dispatch({type:OPEN_MODIFY_HABIT_MODAL})
      dispatch({type:SET_MODIFY_HABIT_MODAL, idx:props.idx})
  }

  function deleteHabit(){
      dispatch({type: DELETE_MY_HABIT_REQUEST, idx: props.idx, id:myHabits[props.idx].id })
  }
  function setDeleteHabit(){
      dispatch({type: SET_ALERT_MODAL_FUNCTION, alertModalFunction: deleteHabit})
      dispatch({type: OPEN_ALERT_MODAL, message:'습관을 삭제하시겠습니까? 이미 루틴에 등록된 습관이 있다면 같이 삭제됩니다.'})
  }
  return(
      <Grid item lg={3} md={6} xs={12} className='habits'>
      <Wrapper>
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2" className='text'>
                    {props.habit.name}
                </Typography>
                <Typography color="textSecondary" className='text'>
                    {props.habit.time_required}분
                </Typography>
                <Typography variant="body2" component="p" className='text'>
                    {props.habit.content}
                </Typography>
            </CardContent>
            <CardActions>
            <Button size="small" color="primary" onClick={openModal}>
                수정
            </Button>
            <Button size="small" color="primary" onClick={setDeleteHabit}>
                삭제
            </Button>
            </CardActions>
        </Card>
      </Wrapper>
      </Grid>
  );
}
export default App;