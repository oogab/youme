import React, { forwardRef, useCallback, useEffect, useState, useRef } from 'react'
import { Grid, IconButton, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { convertNumDay } from '../../../config/config'
import { CERTIFY_CHALLENGE_REQUEST, UPLOAD_CHALLENGE_IMAGE_REQUEST, CLEAR_CERTIFY_CHALLENGE, CLEAR_IMAGE_PATH } from '../../../reducers/challenge'
import { useSnackbar } from 'notistack';
import CloseIcon from '@material-ui/icons/Close';
import DarkTextField from '../../Etc/DarkTextField'
//keyboard
import Keyboard from 'react-hangul-virtual-keyboard';
import "react-simple-keyboard/build/css/index.css";
import Hangul from "hangul-js";
import "hangul-virtual-keyboard/build/css/index.css";

import Wrapper from './styles'
// import KeyBoard from '../../Keyboard/index';
// forwardRef를 써서 warning을 없애긴 했는데 어떤 문제인지 정확히는 모르겠다...
let inputText="";
let buttonArray=[];
const CertModal = forwardRef((props, ref) => {
  const { enqueueSnackbar } = useSnackbar();
  const { challenge, closeCertModal } = props
  const dispatch = useDispatch()
  const imageInput = useRef()
  const { challengeImagePath, certifyChallengeError, certifyChallengeDone } = useSelector((state) => state.challenge)
  const activeDays = challenge.Challenge.ChallengeCertificationDays.filter((day) => day.certification_available === true)
  const activeTime = {
    startTime: challenge.Challenge.ChallengeCertificationTimes[0].certification_available_start_time.substring(0, 5),
    endTime: challenge.Challenge.ChallengeCertificationTimes[0].certification_available_end_time.substring(0, 5)
  }

  const keyboard = useRef(null);
  const [layout, setLayout] = useState("default")
  const [language, setLanguage] = useState("default")
 
  //키보드 열기
  const [keyboardopen, setKeyboardOpen] = useState(false)
  function onChangeKeyBoard(){ setKeyboardOpen(!keyboardopen) }
   //키보드 값 변경
   const onChange = e => {setContent(e)};
    //키보드 누를때
   const onKeyPress = button => {
     console.log("Button pressed", button);
     if(button !== "{shift}" && button !== "{language}" && button !== "{enter}" && button !=="{bksp}" && button !== "{space}"&& button !=="{tab}"){
       buttonArray.push(button)
     }
     if (button === "{bksp}") {
      buttonArray.pop();
    }
    if (button === "{space}") {
      buttonArray.push(" ");
    }
    if (button === "{tab}") {
      buttonArray.push("  ");
    }
    if (button === "{enter}"){
      buttonArray.push("\n");
    }
      inputText = Hangul.assemble(buttonArray);
    if (button === "{shift}" || button === "{lock}") {
      setLayout(layout === "default" ? "shift" : "default")
    } 
     if( button === "{language}"){
      setLanguage(language === "default" ? "english" : "default")
     }
   };

  const [content, setContent] = useState('')
  const onChangeContent = event => {
     const content = event.target.value;
     setContent(content)
     keyboard.setContent(content);
   };
   function reset(){
    inputText="";
    buttonArray=[];
  }
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click()
  }, [])

  const onUploadImage = useCallback((e) => {
    // console.log('image', e.target.files[0])

    const imageFormData = new FormData()
    imageFormData.append('image', e.target.files[0])

    dispatch({
      type: UPLOAD_CHALLENGE_IMAGE_REQUEST,
      data: imageFormData
    })

  }, [dispatch])

  const certifyChallenge = useCallback(() => {
    if (challengeImagePath === '') {
      enqueueSnackbar('인증샷을 첨부해주세요!', {variant:'warning'})
      return
    }

    const nowDate = new Date()
    const y = nowDate.getFullYear()
    const m = nowDate.getMonth()+1
    const d = nowDate.getDate()

    dispatch({
      type: CERTIFY_CHALLENGE_REQUEST,
      data: {
        img_addr: challengeImagePath,
        content: content.length === 0 ? '인증합니다!' : content,
        certification_datetime: y+'-'+m+'-'+d,
        challengeId: challenge.id // challengeParticipation id...
      }
    })
  }, [challengeImagePath, content, challenge.id, closeCertModal, dispatch, enqueueSnackbar])

  useEffect(() => {
    if (certifyChallengeDone) {
      enqueueSnackbar('인증되었습니다!',{variant:'success'})
      reset()
      closeCertModal()
      dispatch({
        type:CLEAR_CERTIFY_CHALLENGE
      })
    }
    if (certifyChallengeError) {
      enqueueSnackbar(certifyChallengeError,{variant:'error'})
      dispatch({
        type: CLEAR_IMAGE_PATH
      })
      dispatch({
        type:CLEAR_CERTIFY_CHALLENGE
      })
    }
  }, [certifyChallengeDone, certifyChallengeError, enqueueSnackbar])

  const checkCertAvailable = () => {
    const now = new Date()
    // 이건 이후에 최적화 시키자... 일요일을 0번으로!
    const day = ( now.getDay() === 0 ? 6 : now.getDay()-1 )
    const hour = now.getHours()
    const minute = now.getMinutes()

    const startHour = parseInt(activeTime.startTime.substring(0, 2))
    const startMinute = parseInt(activeTime.startTime.substring(3, 5))
    const endHour = parseInt(activeTime.endTime.substring(0, 2))
    const endMinute = parseInt(activeTime.endTime.substring(3, 5))

    const checkCertTime = () => {
      // 24시간 일 경우 무조건 true
      if (startHour === 0 && startMinute === 0 && endHour === 0 && endMinute === 0) {
        return true
      }

      // 시작 시 보다 작고 종료 시 보다 클 경우 false
      if (startHour > hour || endHour < hour) {
        return false
      }
      // 시작 시와 같고 시작 분 보다 작을 경우 false
      if (startHour === hour && startMinute > minute) {
        return false
      }
      // 종료 시와 같고 종료 분 보다 클 경우 false
      if (endHour === hour && endMinute < minute) {
        return false
      }

      return true
    }

    const dayCheck = activeDays.map((day) => day.active_day_of_week).includes(day)
    const timeCheck = checkCertTime()

    return dayCheck&&timeCheck
  }

  const canCert = checkCertAvailable()
  
  return (
    <Wrapper>
    <div 
      style={{
        backgroundColor: 'black',
        border: '2px solid #ffffff',
        padding: "15px",
        borderRadius:'5px',
      }}
    >
      <IconButton style={{ position: 'absoulte', float: 'right', color: '#CCCCCC', padding: 0 }} onClick={closeCertModal}>
        <CloseIcon onClick={reset}/>
      </IconButton>
      <Grid container spacing={3}>
        <Grid item xs={12} style={{ textAlign: 'center' }} >
          <img alt={challenge.Challenge.name} src={challengeImagePath ? challengeImagePath : "/images/camera.png"} style={{ maxWidth: 100, maxHeight: 50 }} />
          <input accept="image/*" type="file" name="image" hidden ref={imageInput} onChange={onUploadImage} />
        </Grid>
        <Grid item xs={12}>
          <DarkTextField
            label="인증 메모"
            multiline
            rows={3}
            value={inputText}
            placeholder="인증 메모를 남겨보세요!"
            variant="outlined"
            onClick={onChangeKeyBoard}
            onChange={onChangeContent}
            fullWidth
          />
        </Grid>
        {
          keyboardopen ? <Keyboard
          keyboardRef={r=>keyboard.r}
          layoutName={layout}
          language={language}
          onChange={onChange}
          onKeyPress={onKeyPress}
          className='keyboard'
        /> : null
        }
        
        <>
        <Grid item xs={12} >
        {
          canCert
            ? <span>지금 인증 할 수 있습니다!</span>
            : <span>지금은 인증 할 수 없습니다. 가능한 요일과 시간을 확인해주세요!</span>
        }
        </Grid>
        <Grid item xs={12} style={{padding: '0 12px'}} >
          인증가능 요일 : {activeDays.map((day, i) => <span key={i}>{convertNumDay(day.active_day_of_week)} </span>)}
        </Grid>
        <Grid item xs={12} style={{padding: '0 12px'}} >
          인증가능 시간 : {activeTime.startTime} ~ {activeTime.endTime}
        </Grid>
        <Grid item xs={6} >
          <Button fullWidth onClick={onClickImageUpload} className='left-btn' >사진 업로드</Button>
        </Grid>
        <Grid item xs={6} >
          <Button disabled={!canCert} fullWidth onClick={certifyChallenge}  className='right-btn'>인증하기!</Button>
        </Grid>
        </>
      </Grid>
    </div>
    </Wrapper>
  )
})

export default CertModal