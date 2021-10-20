import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Container, Paper, Button } from '@material-ui/core/';
import {  MenuItem} from '@material-ui/core/';
import { useSelector, useDispatch } from 'react-redux';
import CssTextField from './CssTextField';
import AddRoutineButton from '../Routine/AddRoutineButton/index'
import { LOAD_MY_INFO_REQUEST, UPDATE_MY_INFO_REQUEST } from '../../reducers/user';
import {OPEN_ALERT_MODAL, SET_ALERT_MODAL_FUNCTION, OPEN_ADDRESS_MODAL} from '../../reducers/modal'
import Wrapper from './styles'



// const ColorTeal = withStyles((theme) => ({
//   root: {
//     color: theme.palette.getContrastText(teal[500]),
//     backgroundColor: teal[500],
//     '&:hover': {
//       backgroundColor: teal[700],
//     },
//   },
// }))
  
// const ColorButton = ColorTeal(Button);

// const MyInfoContentDefaultComponent = props => {
//   const { LefetComponent, RightComponet } = props;

//   return (
//       <>
//       <Grid item xs={4} md={3} xl={2} style={{ color: 'teal' }}>
//         {LefetComponent}
//       </Grid>
//       <Grid item xs={8} md={9} xl={10}>
//         {RightComponet}
//       </Grid>
//       </>
//   );
// };

// const MyInfoInputComponent = props => {
//   let { title, data, defaultValue, handleChange, disabled } = props;

//   return (
//     <MyInfoContentDefaultComponent
//       LefetComponent={
//         <Typography variant="body1" className="title">
//           {title}
//         </Typography>
//       }
//       RightComponet={
//         <TextField
//           value={data}
//           defaultValue={defaultValue}
//           variant="outlined"
//           fullWidth={true}
//           onChange={handleChange}
//           style={{ backgroundColor: "white" }}
//           disabled={ disabled }
//         />
//       }
//     />
//   );
// };

// const MyInfoSelectComponent = props => {
//   let { title, data, handleChange, defaultValue, arrays } = props;

//   return (
//     <MyInfoContentDefaultComponent
//       LefetComponent={
//         <Typography variant="body1" className="title">
//           {title}
//         </Typography>
//       }
//       RightComponet={
//         <TextField
//           select
//           value={data}
//           defaultValue={defaultValue}
//           style={{ backgroundColor: "white" }}
//           fullWidth={true}
//           onChange={handleChange}
//           variant="outlined"
//         >
//           {arrays.map((option, i) => (
//             <MenuItem key={i} value={option} >
//               {option}
//             </MenuItem>
//           ))}
//         </TextField>
//       }
//     />
//   );
// };

// const MyInfoBirthdayComponent = props => {
//   let { title } = props;

//   return (
//     <MyInfoContentDefaultComponent
//       LefetComponent={
//         <Typography variant="body1" className="title">
//           {title}
//         </Typography>
//       }
//       RightComponet={
//         <TextField
//           id="date"
//           type="date"
//           style={{ backgroundColor: "white" }}
//           variant="outlined"
//           fullWidth={true}
//           InputLabelProps={{ shrink: true }}
//         />
//       }
//     />
//   );
// }


const Profile = () => {
  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)
  const { addressInfo } = useSelector((state) => state.modal)
  const genders = ['남', '여', '기타'];
  const [firstLoad, setFirstLoad] = useState(true);
  const [nickname, setNickname] = useState(me?me.nickname:'')
  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value)
  }, [])

  const [phoneNumber, setPhoneNumber] = useState(me?me.phone_number:'')
  const onChangePhoneNumber = useCallback((e) => {
    setPhoneNumber(e.target.value)
  }, [])

  const [gender, setGender] = useState(me?me.gender:'기타');
  const onChangeGender = useCallback((e) => {
    setGender(e.target.value)
  }, [])

  const [age, setAge] = useState(me?me.age:0)
  const onChangeAge = useCallback((e) => {
    setAge(e.target.value)
  }, [])

  const [postCode, setPostCode] = useState(me?me.post_code:'')
  const onChangePostCode = useCallback((e) => {
    setPostCode(e.target.value)
  }, [])

  const [mainAddress, setMainAddress] = useState(me?me.main_address:'')
  const onChangeMainAddress = useCallback((e) => {
    setMainAddress(e.target.value)
  }, [])
  const [subAddress, setSubAddress] = useState(me?me.sub_address:'')
  const onChangeSubAddress = useCallback((e) => {
    setSubAddress(e.target.value)
  }, [])
  
  useEffect(()=>{
    if(addressInfo.sigunguCode){
      if(!firstLoad){
        setPostCode(addressInfo.sigunguCode)
        setMainAddress(addressInfo.address)
      }
    }
    if(firstLoad){
      setFirstLoad(false)
    }
  },[addressInfo])

  function openAddressModal(){
    dispatch({type:OPEN_ADDRESS_MODAL})
  }
  
  function updateInfo(){
    dispatch({
      type: UPDATE_MY_INFO_REQUEST,
      data: {
        nickname,
        gender,
        age,
        "post_code":postCode,
        "main_address": mainAddress,
        "sub_address": subAddress,
        phone_number:phoneNumber,
      }
    })
  }

  function onSubmit(){
    dispatch({
      type: SET_ALERT_MODAL_FUNCTION,
      alertModalFunction: updateInfo
    })
    dispatch({type: OPEN_ALERT_MODAL, message:'정보를 수정하시겠습니까?'})
  }

  // const onSubmit = useCallback(() => {
  //   console.log('hi')
    
  // }, [])

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST
    })
  }, [dispatch])


  
  return (
    <Wrapper>
      <div className='menu daily-menu'>
      <h3>개인 정보</h3>
      </div>
      <hr style={{border:'#dbdbdb 1px solid'}}/>
      <Container>
        <Paper className='input-paper'>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CssTextField defaultValue={me?.name} id="outlined-basic" label="이름" variant="outlined" fullWidth={true} disabled InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <CssTextField defaultValue={nickname} /*value={nickname}*/ id="outlined-basic" label="닉네임" fullWidth={true} onChange={onChangeNickname} variant="outlined" InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}/>
            </Grid>
            <Grid item xs={12}>
              <CssTextField defaultValue={me?.email} id="outlined-basic" label="이메일" variant="outlined" disabled fullWidth={true} InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}/>
            </Grid>
            <Grid item xs={12}>
              <CssTextField defaultValue={phoneNumber} /*value={phoneNumber}*/ fullWidth={true} id="outlined-basic" onChange={onChangePhoneNumber} label="전화번호" variant="outlined" InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <CssTextField select defaultValue={gender} label="성별" fullWidth={true} onChange={onChangeGender} variant="outlined" InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}>
                      {genders.map((option, i) => (
                        <MenuItem key={i} value={option} >
                          {option}
                        </MenuItem>
                      ))}
              </CssTextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <CssTextField select defaultValue={age} fullWidth={true} label="나이" onChange={onChangeAge} variant="outlined" InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}>
                        {[...Array(100).keys()].map(x => ++x).map((age, i) => (
                          <MenuItem key={i} value={age} >
                            {age}
                          </MenuItem>
                        ))}
              </CssTextField>
            </Grid>
            <Grid item xs={6}>
            <CssTextField
              required
              id="outlined-required"
              label="우편번호"
              value={postCode}
              defaultValue={postCode}
              variant="outlined"
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
              <CssTextField value={mainAddress} defaultValue={mainAddress} variant="outlined" label="주소" fullWidth={true} onChange={onChangeMainAddress} InputProps={{
                readOnly: true}} InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}/>
            </Grid>
            <Grid item xs={12}>
              <CssTextField /*value={address}*/ defaultValue={subAddress} variant="outlined" label="상세 주소" fullWidth={true} onChange={onChangeSubAddress} InputLabelProps={{ style:{fontFamily: 'SCDream4'}}}/>
            </Grid>
            <Grid item xs={0} md={3}></Grid>
            <Grid item xs={12} md={6} className='button-div'>
              <AddRoutineButton title='정보 수정' variant="contained" onClick={onSubmit} />
            </Grid>
            <Grid item xs={0} md={3}></Grid>
          </Grid>
          </Paper>
      </Container>

    </Wrapper>
  )
}

export default Profile;
