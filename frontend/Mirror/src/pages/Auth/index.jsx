import React, {  useEffect } from 'react';
import Wrapper from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import LoginForm from '../../components/Auth/LoginForm';
import {Typography} from '@material-ui/core'
import './index.css';
const Auth = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { me } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST
    })
    console.log('hi')
  }, [dispatch])

  // 로그인 상태이면 홈 화면으로 이동!
  useEffect(() => {
    if (me) {
      history.push('/Home')
    }
  }, [me, history])

  return(
    <Wrapper>
      <div className="box">
        <div className="box2">
          <Typography
                variant="h1"
                className="logo"
                style={{ fontFamily: 'BAUHS93', color:'white' }}
              >
                MYME
          </Typography>
        </div>
        <div className="LoginCard">
          <LoginForm />
        </div>
      </div>
    </Wrapper>
  ) ;
};

export default Auth;
