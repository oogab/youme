import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../../../layout/';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Grid, LinearProgress, Modal, Paper, Typography, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { ColorButton } from '../../../common/Buttons';
import { CLEAR_DELETE_CHALLENGE_PARTICIPATION, DELETE_CHALLENGE_PARTICIPATION_REQUEST } from '../../../reducers/challenge';
import { OPEN_ALERT_MODAL, OPEN_CONFIRM_MODAL, SET_ALERT_MODAL_FUNCTION } from '../../../reducers/modal';
import { useHistory } from 'react-router-dom';
import ShowCertModal from '../../../components/Challenge/ShowCertModal';
import { advice, categories, convertCertType, convertDaysWeek } from '../../../config/config';
import './style.css'

const ChallengeDashboard = ({match}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  // 항상 명심할것이 myChallenge에는 ChallengeParticipation의 정보가 담겨 있다. Challenge 자체가 아님!
  const { myChallenge, deleteChallengeParticipationDone, deleteChallengeParticipationError } = useSelector((state) => state.challenge)
  const challengeCertEvents = myChallenge.DailyCertifyChallenges.map((v) => {
    return { id: v.id, title: '인증', color: '#89DDBF', start: v.createdAt, allDay: true }
  })
  
  const achieveRate = 100*myChallenge.certification_count/myChallenge.total_number_of_certification

  const [certInfo, setCertInfo] = useState(null)
  const [showCertification, setShowCertification] = useState(false)
  const onShowCertification = useCallback((info) => {
    setCertInfo(myChallenge.DailyCertifyChallenges.find((v) => v.id === parseInt(info.event.id)))
    setShowCertification(true)
  }, [myChallenge])

  const closeShowCertification = useCallback(() => {
    setShowCertification(false)
  }, [])

  const onResignChallenge = useCallback(() => {
    dispatch({
      type: DELETE_CHALLENGE_PARTICIPATION_REQUEST,
      data: myChallenge.id
    })
  }, [dispatch, myChallenge.id])

  const onAlertResignChallenge = useCallback(() => {
    dispatch({
      type: SET_ALERT_MODAL_FUNCTION,
      alertModalFunction: onResignChallenge
    })
    dispatch({
      type: OPEN_ALERT_MODAL,
      message: '정말 그만 두시겠어요?'
    })
  }, [onResignChallenge, dispatch])

  useEffect(() => {
    if (deleteChallengeParticipationDone) {
      dispatch({
        type: OPEN_CONFIRM_MODAL,
        message: '성공적으로 탈퇴하였습니다.'
      })
      dispatch({
        type: CLEAR_DELETE_CHALLENGE_PARTICIPATION
      })
      return history.goBack()
    }
    if (deleteChallengeParticipationError) {
      dispatch({
        type: OPEN_CONFIRM_MODAL,
        message: '탈퇴에 실패했습니다.'
      })
      dispatch({
        type: CLEAR_DELETE_CHALLENGE_PARTICIPATION
      })
    }
  }, [deleteChallengeParticipationDone, deleteChallengeParticipationError, dispatch, history])

  // 로그 확인용
  // useEffect(() => {
  //   console.log(challengeCertEvents)
  // }, [])

  return (
    <Layout>
      <Grid container >
      {
        myChallenge
          ?
            <>
              <Grid item xs={12}>
                <Paper style={{ margin: '10px 0', padding: '10px' }}>
                  <Typography variant="h5" style={{ fontFamily: 'SCDream4', fontWeight: 'bold' }}>
                    {myChallenge.Challenge.name}
                  </Typography>
                  <div style={{ textAlign: 'center', marginTop: 10 }}>
                    <img src={myChallenge.Challenge.img_addr} style={{ maxWidth:200, maxHeight: 200 }} alt=''/>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper style={{ marginTop: '10px', padding: '10px' }}>
                  <Grid container item xs={12} style={{ marginBottom: '10px' }} >
                    <Grid item xs={4}>
                      <div className="term">{categories[myChallenge.Challenge.category-1].label}</div>
                    </Grid>
                    <Grid item xs={4}>
                      <div className="term">{myChallenge.Challenge.period % 7 ? myChallenge.Challenge.period : convertDaysWeek(myChallenge.Challenge.period)}일</div>
                    </Grid>
                    <Grid item xs={4}>
                      <div className="term">{convertCertType(myChallenge.Challenge.certification_cycle)}</div>
                    </Grid>
                  </Grid>
                  <h3>달성률 {Math.round(10*achieveRate)/10}%</h3>
                  <LinearProgress style={{ height: '15px', marginBottom: '10px' }} variant="determinate" value={achieveRate}/>
                  <Grid container item xs={12} style={{ marginTop: '10px', marginBottom: '10px' }} >
                    <Grid item xs={6}>
                      <div><span role="img" aria-label='certi-day'>✔</span> 인증한 일 수 : {myChallenge.certification_count}</div>
                    </Grid>
                    <Grid item xs={6}>
                      <div><span role="img" aria-label='more-certi-day'>📌</span> 남은 인증 일 수 : {myChallenge.total_number_of_certification - myChallenge.certification_count}</div>
                    </Grid>
                  </Grid>
                  <div><span role="img" aria-label='startdate'>📅 </span>총 기간 : {myChallenge.start_date} ~ {myChallenge.end_date}</div>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper style={{ marginTop: '10px', padding: '10px' }}>
                  <h3><span role="img" aria-label="advice">🗒</span> MYME Advice</h3>
                  <div style={{ marginTop: '10px' }}>{advice(Math.floor(achieveRate/10))}</div>
                </Paper>
              </Grid>
              <Grid item xs={12} >
                <Paper style={{marginTop: '10px', padding: '10px'}}>
                  <FullCalendar
                    plugins={[dayGridPlugin]}
                    headerToolbar={{
                      left: 'prev',
                      center: 'title',
                      right: 'today next'
                    }}
                    initialView='dayGridMonth'
                    locale='ko'
                    selectable={true}
                    dayMaxEvents={true}
                    events={challengeCertEvents}
                    height='auto'
                    eventClick={onShowCertification}
                  />
                </Paper>
                <Modal
                  open={showCertification}
                  onClose={closeShowCertification}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <ShowCertModal info={certInfo} closeShowCertModal={closeShowCertification} />
                </Modal>
              </Grid>
              <Grid item xs={12}>
                <Paper style={{ marginTop: '10px', padding: '10px' }}>
                  <h3><span role="img" aria-label='challenge-writer'>🙂</span> 챌린지 개설자</h3>
                  <Grid item xs={12} style={{ marginTop: '5px' }}>
                    <Typography><strong>{myChallenge.Challenge.User.nickname}</strong> / email : {myChallenge.Challenge.User.email}</Typography>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper style={{ margin: '10px 0', padding: '10px' }}>
                  <Grid container>
                    <Grid item xs={6}>
                        <Button fullWidth onClick={()=>{history.goBack()}} >뒤로가기</Button>
                    </Grid>
                    <Grid item xs={6}>
                      <ColorButton fullWidth onClick={onAlertResignChallenge} >챌린지 그만두기</ColorButton>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </>
          :
            <Grid item xs={12}>
              <Typography style={{ fontFamily: 'SCDream4' }}>챌린지를 불러오는 중입니다.</Typography>
            </Grid>
      }
      </Grid>
    </Layout>
  )
}

export default ChallengeDashboard