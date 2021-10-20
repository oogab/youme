import React from 'react';
import { Grid, Container, Paper } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import CssTextField from '../Profile/CssTextField';
import AddRoutineButton from '../Routine/AddRoutineButton/index'
import Wrapper from './styles'

const Profile = () => {
  const dispatch = useDispatch()
  
  function changePassword(){

  }

  return (
    <Wrapper>
      <div className='menu daily-menu'>
      <h3>비밀번호 변경</h3>
      </div>
      <hr/>
      <Container>
        <Paper className='input-paper'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CssTextField id="outlined-basic" label="현재 비밀번호" variant="outlined" fullWidth={true}/>
            </Grid>
            <Grid item xs={12}>
              <CssTextField id="outlined-basic" label="새로운 비밀번호" variant="outlined" fullWidth={true}/>
            </Grid>
            <Grid item xs={12}>
              <CssTextField id="outlined-basic" label="새로운 비밀번호 확인" variant="outlined" fullWidth={true}/>
            </Grid>
            <Grid item xs={0} md={3}></Grid>
            <Grid item xs={12} md={6} className='button-div'>
              <AddRoutineButton title='비밀번호 변경' variant="contained" onClick={changePassword}/>
            </Grid>
            <Grid item xs={0} md={3}></Grid>
          </Grid>
          </Paper>
      </Container>

    </Wrapper>
  )
}

export default Profile;
