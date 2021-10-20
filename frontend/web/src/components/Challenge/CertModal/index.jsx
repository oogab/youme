import React, { forwardRef, useCallback, useEffect, useState, useRef } from 'react'
import { Grid, IconButton, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { ColorButton } from '../../../common/Buttons'
import { convertNumDay } from '../../../config/config'
import { CERTIFY_CHALLENGE_REQUEST, UPLOAD_CHALLENGE_IMAGE_REQUEST } from '../../../reducers/challenge'
import CloseIcon from '@material-ui/icons/Close';
import { OPEN_CONFIRM_MODAL } from '../../../reducers/modal'
import CircularProgress from '@material-ui/core/CircularProgress';
// forwardRef를 써서 warning을 없애긴 했는데 어떤 문제인지 정확히는 모르겠다...
const CertModal = forwardRef((props, ref) => {
  const { challenge, closeCertModal } = props
  const dispatch = useDispatch()
  const imageInput = useRef()
  const { challengeImagePath, certifyChallengeError, certifyChallengeDone } = useSelector((state) => state.challenge)
  const activeDays = challenge.Challenge.ChallengeCertificationDays.filter((day) => day.certification_available === true)
  const activeTime = {
    startTime: challenge.Challenge.ChallengeCertificationTimes[0].certification_available_start_time.substring(0, 5),
    endTime: challenge.Challenge.ChallengeCertificationTimes[0].certification_available_end_time.substring(0, 5)
  }
  const [content, setContent] = useState('')
  const {uploadChallengeImageLoading} = useSelector((state)=>{return state.challenge})
  const onChangeContent = useCallback((e) => {
    setContent(e.target.value)
  }, [])

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click()
  }, [])

  const onUploadImage = useCallback((e) => {
    if(!e.target.files[0]) return
    const imageFormData = new FormData()
    imageFormData.append('image', e.target.files[0])

    dispatch({
      type: UPLOAD_CHALLENGE_IMAGE_REQUEST,
      data: imageFormData
    })

  }, [dispatch])

  const certifyChallenge = useCallback(() => {
    if (challengeImagePath === '') {
      dispatch({
        type: OPEN_CONFIRM_MODAL,
        message: '인증샷을 첨부해주세요!'
      })
      return
    }

    const nowDate = new Date()
    const y = nowDate.getFullYear()
    const m = nowDate.getMonth() + 1
    const d = nowDate.getDate()


    dispatch({
      type: CERTIFY_CHALLENGE_REQUEST,
      data: {
        img_addr: challengeImagePath,
        content: content.length === 0 ? '인증합니다!' : content,
        certification_datetime: y + '-' + m + '-' + d,
        challengeId: challenge.id // challengeParticipation id...
      }
    })
  }, [challengeImagePath, content, challenge.id, dispatch])

  useEffect(() => {
    if (certifyChallengeDone) {
      dispatch({
        type: OPEN_CONFIRM_MODAL,
        message: '인증되었습니다!'
      })
      closeCertModal()
    }
    if (certifyChallengeError) {
      dispatch({
        type: OPEN_CONFIRM_MODAL,
        message: certifyChallengeError
      })
    }
  }, [certifyChallengeDone, certifyChallengeError,closeCertModal, dispatch])

  const checkCertAvailable = () => {
    const now = new Date()
    const startDate = new Date(challenge.start_date)
    // 이건 이후에 최적화 시키자... 일요일을 0번으로!

    const day = (now.getDay() === 0 ? 6 : now.getDay() - 1)
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
    const startDayCheck = now >= startDate

    return dayCheck && timeCheck && startDayCheck
  }

  const canCert = checkCertAvailable()

  return (
    <div
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        position: 'absolute',
        maxWidth: 400,
        minWidth: 300,
        backgroundColor: '#E5E3E3',
        border: '1px solid #66A091',
        padding: "15px",
        borderRadius: '10px',
      }}
    >
      <IconButton style={{ position: 'absoulte', float: 'right', color: '#CCCCCC', padding: 0 }} onClick={closeCertModal}>
        <CloseIcon />
      </IconButton>
      <Grid container spacing={3}>
        <Grid item xs={12} style={{ textAlign: 'center' }} >
          {
            uploadChallengeImageLoading?
            <CircularProgress />
            :
            <img alt={challenge.Challenge.name} src={challengeImagePath ? challengeImagePath : "/images/camera.png"} style={{ maxWidth: 200, maxHeight: 200 }} />
          }
          
          <input accept="image/*" type="file" name="image" hidden ref={imageInput} onChange={onUploadImage} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="인증 메모"
            multiline
            rows={3}
            value={content}
            placeholder="인증 메모를 남겨보세요!"
            variant="outlined"
            onChange={onChangeContent}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} >
          {
            canCert
              ? <span>지금 인증 할 수 있습니다!</span>
              : <span>지금은 인증 할 수 없습니다. 가능한 요일과 시간을 확인해주세요!</span>
          }
        </Grid>
        <Grid item xs={12} style={{ padding: '0 12px' }} >
          인증가능 요일 : {activeDays.map((day, i) => <span key={i}>{convertNumDay(day.active_day_of_week)} </span>)}
        </Grid>
        <Grid item xs={12} style={{ padding: '0 12px' }} >
          인증가능 시간 : {activeTime.startTime} ~ {activeTime.endTime}
        </Grid>
        <Grid item xs={6} >
          <ColorButton fullWidth onClick={onClickImageUpload} >사진 업로드</ColorButton>
        </Grid>
        <Grid item xs={6} >
          <ColorButton disabled={!canCert} fullWidth onClick={certifyChallenge} >인증하기!</ColorButton>
        </Grid>
      </Grid>
    </div>
  )
})

export default CertModal