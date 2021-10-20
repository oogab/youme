import React, { useCallback,  useState } from 'react';
import Wrapper from './styles'
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import { convertCertType, convertDaysWeek } from '../../../config/config'
import Modal from '@material-ui/core/Modal';
import CertModal from '../../Challenge/CertModal';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CLEAR_CERTIFY_CHALLENGE, CLEAR_IMAGE_PATH, SHOW_MY_CHALLENGE } from '../../../reducers/challenge';

const App = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { challenge } = props
  const [modalOpen, setModalOpen] = useState(false)

  const onCertModal = useCallback(() => {
    setModalOpen(true)
  }, [])

  const onChallengeDashboard = useCallback((id) => {
    dispatch({
      type: SHOW_MY_CHALLENGE,
      data: id
    })
    history.push(`/ChallengeDashboard/${id}`)
  }, [dispatch,history])

  const closeCertModal = useCallback(() => {
    setModalOpen(false)
    dispatch({
      type: CLEAR_CERTIFY_CHALLENGE
    })
    dispatch({
      type: CLEAR_IMAGE_PATH
    })
  }, [dispatch])

  return(
    <Wrapper>
      <img alt={challenge.Challenge?challenge.Challenge.name:''} src={challenge.Challenge?.img_addr ? challenge.Challenge?.img_addr : ''} style={{ width: '270px', height: '100px', objectFit: 'contain' }} />
      <Grid item xs={12} >
        <Typography gutterBottom className='title' component="div" variant="h6" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontFamily: 'SCDream4' }}>{challenge.Challenge?.name}</Typography>
      </Grid>
      <Grid container spacing={0}>
        <Grid item xs={6} >
          <div className='term'>
            {
              challenge.period % 7 === 0
                ? convertDaysWeek(challenge.period)
                : <> {challenge.period} 일 </>
            }
          </div>
        </Grid>
        <Grid item xs={6} >
          <div className='term'>
            {convertCertType(challenge.Challenge?.certification_cycle)}
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} >
          <span role="img" aria-label='calendar'>📅 </span>
          <span>
            {challenge.start_date} ~ {challenge.end_date}
          </span>
        </Grid>
      </Grid>
      <Grid container spacing={0} style={{display: 'flex', alignItems: 'center'}}>
        <Grid item xs={8} style={{ padding: '0 5px' }} >
          <LinearProgress variant="determinate" value={100*challenge.certification_count/challenge.total_number_of_certification} />
        </Grid>
        <Grid item xs={4} >
          <span className='title' >
            <span role="img" aria-label='run'>🏃🏼‍♂️</span> {Math.round(10*100*challenge.certification_count/challenge.total_number_of_certification) / 10} %
          </span>
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        <Grid item xs={6} onClick={onCertModal}>
          <div className='confirm-btn'>
            인증하기  
          </div>
        </Grid>
        <Grid item xs={6} onClick={() => onChallengeDashboard(challenge.id)} >
          <div className='confirm-btn'>
            상세보기
          </div>
        </Grid>
        <Modal
          open={modalOpen}
          onClose={closeCertModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <CertModal challenge={challenge} closeCertModal={closeCertModal} />
        </Modal>
      </Grid>
    </Wrapper>
  );
}
export default App;