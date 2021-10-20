import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Grid,
  Typography,
  Divider,
  TextField,
  Container,
} from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import { useDispatch } from 'react-redux';
import { loginRequestAction } from '../../../reducers/user';
import Wrapper from './styles';

const regExpEm = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const regExpPw = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;

const LoginForm = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [email])

  const [password, setPassword] = useState('')
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value)
  }, [password])

  const [disabled, setDisabled] = useState(true)

  const onLogin = useCallback(() => {
    if (!password || !email) {
      alert('You need both email and password.');
      return;
    }

    if (!regExpEm.test(email)) {
      alert('이메일 형식이 맞지 않습니다.');
      return;
    }

    if (!regExpPw.test(password)) {
      alert('비밀번호는 숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 입력하세요.')
      return
    }

    dispatch(loginRequestAction({email, password}))
  }, [email, password, dispatch])




  useEffect(() => {
    if (email !== '' && password !== '') {
      setDisabled(false);
    }

    if (email === '' || password === '') {
      setDisabled(true);
    }
  }, [email, password]);

  return (
    <Wrapper>
    <Container maxWidth="sm" style={{margin: '0 20px', padding: '20px', border: 'solid 1px #eeeeee', borderRadius: '10px'}}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        className="grid"
      >
        <Grid>
          <AccountBoxIcon fontSize="large" style={{ color: '#89DDBF', marginTop:"5px " }} />
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h5">
            로그인
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="outlined-required"
            placeholder="이메일"
            className="text-field"
            defaultValue={email}
            variant="outlined"
            style={{background: 'white'}}
            fullWidth={true}
            onChange={onChangeEmail}
            // onFocus={event => {
            //   setIsShowKeyborad(true);
            // }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="outlined-password-input"
            placeholder="비밀번호"
            className="text-field"
            type="password"
            autoComplete="current-password"
            defaultValue={password}
            variant="outlined"
            style={{background: 'white'}}
            // style={{border: '#fff 1px solid', color:'#fff'}}
            // InputLabelProps={{ style:{color: '#fff'}}}
            // inputProps={{style:{color:'#fff'}}}
            fullWidth={true}
            onChange={onChangePassword}
            // onFocus={event => {
            //   setIsShowKeyborad(true);
            // }}
          />
        </Grid>
        <Grid item xs={12} className="grid-item">
          <Button
            variant="contained"
            disabled={disabled}
            fullWidth={true}
            
            color="secondary"
            style={{color:'white', border:'#eee 1px solid'}}
            onClick={onLogin}
            className="grid-item-button"
          >
            login
          </Button>
        </Grid>
        <Grid item xs={12} className="grid-item" style={{margin:'10px 0'}}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
            <Grid item xs={5}>
            <Divider style={{backgroundColor:'#fff'}}/>
            </Grid>

            <Grid item xs={2}>
              <Typography variant="h6" align="center" className="grid-item-typography1">
                or
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Divider style={{backgroundColor:'#fff'}}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <div style={{textAlign: 'center', letterSpacing: '2px', color:'#eee', float:'right'}}>
           회원가입 하러가기
          </div>
        </Grid>
        <Grid item xs={6} style={{textAlign: 'center', float:'left'}}>
          <img src="./images/mymeQR.png" width="100px" alt=''></img>
        </Grid>
        
      
       
      </Grid>
    </Container>
    {/* <div style={{textAlign:'center', marginTop:'10px'}}>회원가입은 https://myme.today 에서 가능합니다</div> */}
    </Wrapper>
  );
}

export default LoginForm