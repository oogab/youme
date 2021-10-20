import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Grid,
  Typography,
  Divider,
  Checkbox,
  Container,
  FormControlLabel,
  MenuItem,
} from '@material-ui/core';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST, CHANGE_SIGN_UP_MODE } from '../../../reducers/user';
import { OPEN_ADDRESS_MODAL } from '../../../reducers/modal';
import CssTextField from '../../Profile/CssTextField';
const ErrorMessage = styled.div`
    color: red;
`

const regExpEm = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const regExpPw = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;
const regExpPN = /^\d{3}-\d{3,4}-\d{4}$/;

const SignupForm = () => {
  const dispatch = useDispatch()
  const { addressInfo } = useSelector((state) => state.modal)
  const [disabled, setDisabled] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(()=>{
    if(addressInfo.sigunguCode){
      if(!firstLoad){
        setPostCode(addressInfo.sigunguCode)
        setMainAddress(addressInfo.address)
      }
    }
    if(firstLoad){
      setPostCode('')
      setMainAddress('')
      setFirstLoad(false)
    }
  },[addressInfo])
  const [name, setName] = useState('')
  const onChangeName = useCallback((e) => {
    setName(e.target.value)
  }, [])

  const genders = ['남', '여', '기타'];

  const [gender, setGender] = useState('기타');
  const onChangeGender = useCallback((e) => {
    setGender(e.target.value)
  }, [])

  const [age, setAge] = useState(0)
  const onChangeAge = useCallback((e) => {
    setAge(e.target.value)
  }, [])

  const [email, setEmail] = useState('')
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [])

  const [nickname, setNickname] = useState('')
  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value)
  }, [])

  const [password, setPassword] = useState('')
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value)
  }, [])

  const [passwordCheck, setPasswordCheck] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const onChangePasswordCheck = useCallback((e) => {
      setPasswordCheck(e.target.value)
      setPasswordError(e.target.value !== password)
  }, [password])

  const [phoneNumber, setPhoneNumber] = useState('')
  const onChangePhoneNumber = useCallback((e) => {
    setPhoneNumber(e.target.value)
  }, [])

  const [postCode, setPostCode] = useState('')
  const onChangePostCode = useCallback((e) => {
    setPostCode(e.target.value)
  }, [])

  const [mainAddress, setMainAddress] = useState('')
  const onChangeMainAddress = useCallback((e) => {
    setMainAddress(e.target.value)
  }, [])
  const [subAddress, setSubAddress] = useState('')
  const onChangeSubAddress = useCallback((e) => {
    setSubAddress(e.target.value)
  }, [])

  const [term, setTerm] = useState(false)
  const [termError, setTermError] = useState(false)
  const onChangeTerm = useCallback((e) => {
      setTerm(e.target.checked)
      setTermError(false)
  }, [])

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true)
    }
    if (!term) {
      return setTermError(true)
    }

    if (!regExpEm.test(email)) {
      alert('이메일 형식이 맞지 않습니다.');
      return;
    }

    if (!regExpPw.test(password)) {
      alert('비밀번호는 숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 입력하세요.')
      return
    }

    if (!regExpPN.test(phoneNumber)) {
      alert('전화번호는 000-0000-0000 형식으로 입력하세요.')
      return
    }

    if (subAddress.length >= 51) {
      alert('주소는 50자 이하로 기입해주세요')
      return
    }

    dispatch({
      type: SIGN_UP_REQUEST,
      data: { name, email, nickname,
         'phone_number': phoneNumber,
          password,
          gender,
          age,
          "post_code":postCode,
          "main_address": mainAddress,
          "sub_address": subAddress,
        }
    })
    dispatch({
      type: CHANGE_SIGN_UP_MODE
    })
  }, [password, passwordCheck, term, age, dispatch, email, gender, mainAddress, name, nickname, phoneNumber, postCode, subAddress])

  const onChangeSignupMode = useCallback(() => {
    dispatch({
      type: CHANGE_SIGN_UP_MODE
    })
    setFirstLoad(true)
  }, [dispatch])

  useEffect(() => {
    if (name !== '' && email !== '' && nickname !== '' && password !== '' && passwordCheck !== '' && phoneNumber !== '' && mainAddress!==''&& subAddress !== '' && term === true) {
      setDisabled(false);
    }

    if (name === '' || email === '' || nickname === '' || password === '' || passwordCheck === '' || phoneNumber === '' || mainAddress === '' ||subAddress === '' || term === false) {
      setDisabled(true);
    }
  }, [name, email, nickname, password, passwordCheck, phoneNumber, mainAddress, subAddress, term]);

  function openAddressModal(){
    dispatch({type:OPEN_ADDRESS_MODAL})
  }

  return (
    <Container maxWidth="md" style={{margin: '0 20px', padding: '20px', background: '#ffffff', border: 'solid 1px #eeeeee', borderRadius: '10px', boxShadow: '2px 2px 2px #eeeeee'}}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={1}>
            <AssignmentIndIcon color="action" fontSize='large' />
          </Grid>
          <Grid item xs={11}>
          <h3 style={{margin: '5px 0 0 13px'}}>
            회원가입
          </h3>
          </Grid>
        </Grid>
        
        <Grid container item xs={12} md={6} spacing={2}>
        <Grid item xs={12} className="sign-up-grid">
          <CssTextField
            required
            id="outlined-required"
            label="이메일"
            type="email"
            value={email}
            className="text-field"
            variant="outlined"
            style={{background: 'white'}}
            placeholder="이메일"
            fullWidth={true}
            onChange={onChangeEmail}
            InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}
          />
        </Grid>

        <Grid item xs={12} className="sign-up-grid-item2">
          <CssTextField
            required
            id="outlined-password-input"
            label="비밀번호"
            value={password}
            className="textField"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            style={{background: 'white'}}
            placeholder="비밀번호"
            fullWidth={true}
            onChange={onChangePassword}
            InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item2">
          <CssTextField
            required
            id="outlined-password-input"
            label="비밀번호 확인"
            value={passwordCheck}
            className="textField"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            style={{background: 'white'}}
            placeholder="비밀번호 확인"
            fullWidth={true}
            onChange={onChangePasswordCheck}
            InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}
          />
        </Grid>
        <Grid item xs={12}>
        {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </Grid>
        <Grid item xs={6} className="sign-up-grid-item1">
          <CssTextField
            required
            id="outlined-required"
            label="이름"
            value={name}
            className="text-field"
            variant="outlined"
            style={{background: 'white'}}
            placeholder="이름"
            fullWidth={true}
            onChange={onChangeName}
            InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}
          />
        </Grid>
        <Grid item xs={6} className="sign-up-grid-item1">
          <CssTextField
            required
            id="outlined-required"
            label="닉네임"
            value={nickname}
            className="text-field"
            variant="outlined"
            style={{background: 'white'}}
            placeholder="닉네임"
            fullWidth={true}
            onChange={onChangeNickname}
            InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item1">
          <CssTextField
            required
            id="outlined-required"
            label="전화번호"
            value={phoneNumber}
            className="text-field"
            variant="outlined"
            style={{background: 'white'}}
            placeholder="전화번호 000-0000-0000"
            fullWidth={true}
            onChange={onChangePhoneNumber}
            InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}
          />
        </Grid>
        </Grid>
        <Grid container item xs={12} md={6} spacing={2} style={{height: '376px'}}>
        <Grid item xs={6}>
            <CssTextField
              required
              id="outlined-required"
              label="우편번호"
              value={postCode}
              className="text-field"
              variant="outlined"
              style={{background: 'white'}}
              placeholder="우편번호"
              fullWidth={true}
              onChange={onChangePostCode}
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}
            />
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth color='primary' onClick={openAddressModal}>검색</Button>
          </Grid>
          <Grid item xs={12}>
            <CssTextField
              required
              id="outlined-required"
              label="주소"
              value={mainAddress}
              className="text-field"
              variant="outlined"
              style={{background: 'white'}}
              placeholder="주소"
              fullWidth={true}
              onChange={onChangeMainAddress}
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}
            />
          </Grid>
          <Grid item xs={12}>
            <CssTextField
              required
              id="outlined-required"
              label="상세 주소"
              value={subAddress}
              className="text-field"
              variant="outlined"
              style={{background: 'white'}}
              placeholder="상세 주소"
              fullWidth={true}
              onChange={onChangeSubAddress}
              InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}
            />
          </Grid>
          <Grid item xs={6}>
              <CssTextField select defaultValue={gender} label="성별" fullWidth={true} onChange={onChangeGender} variant="outlined" InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}>
                      {genders.map((option, i) => (
                        <MenuItem key={i} value={option} >
                          {option}
                        </MenuItem>
                      ))}
              </CssTextField>
            </Grid>
            <Grid item xs={6}>
              <CssTextField select defaultValue={age} fullWidth={true} label="나이" onChange={onChangeAge} variant="outlined" InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}>
                        {[...Array(100).keys()].map(x => ++x).map((age, i) => (
                          <MenuItem key={i} value={age} >
                            {age}
                          </MenuItem>
                        ))}
              </CssTextField>
            </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox checked={term} onChange={onChangeTerm} />}
            label={<Typography style={{fontFamily: 'SCDream4'}}>MYME 약관에 동의하셔야 합니다.</Typography>}
            InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}
          />
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </Grid>
        </Grid>
        <Grid container item xs={12} className="sign-up-grid-item3" spacing={2}>
          <Grid item xs={0} md={3}>

          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              disabled={disabled}
              fullWidth={true}
              color="primary"
              onClick={onSubmit}
              style={{
                fontSize: 14,
                fontFamily: 'Noto Sans KR',
                fontWeight: 500,
              }}
            >
              회원가입
            </Button>
          </Grid>
          <Grid item xs={0} md={3}>

          </Grid>
        </Grid>
        
        <Grid item xs={5}>
          <Divider />
        </Grid>

        <Grid item xs={2}>
          <h4
            align="center"
            className="sign-up3-grid-item-typography"
          >
            or
          </h4>
        </Grid>

        <Grid item xs={5}>
          <Divider />
        </Grid>
        
        <Grid item xs={6} >
          {/* <h4 align="center" className="sign-up4-grid-item-typography"> */}
          <div style={{textAlign: 'center'}}>
            {'계정이 있으신가요?'}</div>
          {/* </h4> */}
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth={true}
            onClick={onChangeSignupMode}
            className="sign-up4-grid-item-button"
            style={{fontFamily: 'SCDream4'}}
          >
            {'login'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignupForm