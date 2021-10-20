import React, { useCallback, useEffect } from 'react';
import { 
  Grid,
  IconButton,
  Paper,
  Typography,
  Button
} from '@material-ui/core/';
import Layout from '../../layout/';
import Wrapper from './styles';
import PersonIcon from '@material-ui/icons/Person';
import { ColorButton } from '../../common/Buttons';
import { ColorChip } from '../../common/Chips'
import { useDispatch, useSelector } from 'react-redux';
import { categories, convertCertType, convertDaysWeek } from '../../config/config';
import { CLEAR_PARTICIPATE_CHALLENGE, LIKE_CHALLENGE_REQUEST, PARTICIPATE_CHALLENGE_REQUEST, UNLIKE_CHALLENGE_REQUEST } from '../../reducers/challenge';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { OPEN_ALERT_MODAL, OPEN_CONFIRM_MODAL, SET_ALERT_MODAL_FUNCTION } from '../../reducers/modal';
import { useHistory } from 'react-router';
const ChallengeDetail = ({match}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { singleChallenge, participateChallengeDone, participateChallengeError } = useSelector((state) => state.challenge)
  const id = useSelector((state) => state.user.me?.id)
  const liked = singleChallenge.Likers.find((v) => v.id === id)

  const onLike = useCallback(() => {
    dispatch({
      type: UNLIKE_CHALLENGE_REQUEST,
      data: singleChallenge.id
    })
  }, [singleChallenge.id, dispatch])

  const onUnlike = useCallback(() => {
    dispatch({
      type: LIKE_CHALLENGE_REQUEST,
      data: singleChallenge.id
    })
  }, [singleChallenge.id, dispatch])

  const onParticipateChallenge = useCallback(() => {
    dispatch({
      type: PARTICIPATE_CHALLENGE_REQUEST,
      data: {
        start_date: singleChallenge.start_date,
        end_date: singleChallenge.end_date,
        period: singleChallenge.period,
        certification_count: 0,
        total_number_of_certification: singleChallenge.total_number_of_certification,
        challengeId: singleChallenge.id
      }
    })
  }, [dispatch, singleChallenge])

  const onSetParticipateChallenge = useCallback(() => {
    dispatch({
      type: SET_ALERT_MODAL_FUNCTION,
      alertModalFunction: onParticipateChallenge
    })
    dispatch({
      type: OPEN_ALERT_MODAL,
      message: '챌린지에 참여하시겠습니까?'
    })
  }, [dispatch, onParticipateChallenge])

  // loadChallengeDone이 true면 뒤로가기 해도 다시 이 페이지로 돌아온다.
  // 이 페이지가 렌더링 되면 바로 loadChallengeDone을 false로 바꿔준다.
  // useEffect(() => {
  //   dispatch({
  //     type: CLEAR_LOAD_CHALLENGE_DONE
  //   })
  // }, [])

  useEffect(() => {
    if (participateChallengeDone) {
      dispatch({
        type: OPEN_CONFIRM_MODAL,
        message: '챌린지에 참여하였습니다!'
      })
      dispatch({
        type: CLEAR_PARTICIPATE_CHALLENGE
      })
    }
    if (participateChallengeError) {
      dispatch({
        type: OPEN_CONFIRM_MODAL,
        message: participateChallengeError
      })
      dispatch({
        type: CLEAR_PARTICIPATE_CHALLENGE
      })
    }
  }, [participateChallengeDone, participateChallengeError, dispatch])

  return (
    <Layout>
      <Wrapper>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={12}>
            <Paper style={{ padding: '10px' }}>
              <Grid item xs={12} className="titleImg" style={{ textAlign: 'center' }}>
                <img src={singleChallenge.img_addr} alt={singleChallenge.name} style={{width: '100%', maxWidth: 300 }} />
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <h2>{singleChallenge.name}</h2>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Grid container item xs={12}>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ColorChip className="term" style={{ marginLeft: 0 }} label={singleChallenge ? categories[singleChallenge?.category-1]?.label : '분류'}/>
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ColorChip className="term" style={{ margin: 0, padding: '5px 0' }} label={singleChallenge.period % 7 === 0 ? convertDaysWeek(singleChallenge.period) : `${singleChallenge.period}일`} />
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ColorChip className="term" style={{ margin: 0, padding: '5px 0' }} label={convertCertType(singleChallenge.certification_cycle)}  />
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {
                    liked
                      ? <IconButton onClick={onLike}><FavoriteIcon /></IconButton>
                      : <IconButton onClick={onUnlike}><FavoriteBorderIcon /></IconButton>
                  }
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center', margin: '5px' }}>
                  <span><span role="img" aria-label="total-period">📅 </span>총 기간 : {singleChallenge.start_date} ~ {singleChallenge.end_date}</span>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} >
            <Paper>
              <Grid container item xs={12} >
                <Grid item xs={12} style={{ padding: '10px', paddingBottom: 0 }}>
                  <h3>챌린지 설명</h3>
                </Grid>
                <Grid item xs={12} style={{ padding: '10px' }}>
                  <Typography>{singleChallenge?.content}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Grid container item xs={12} style={{ padding: '10px' }}>
                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon color="primary"/><span style={{ marginLeft: 10 }}>참가인원 {singleChallenge?.ChallengeParticipations.length} 명</span>
                </Grid>
                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
                  <FavoriteIcon color="secondary"/><span style={{ marginLeft: 10 }}>좋아요 {singleChallenge?.Likers.length} 명</span>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Grid container style={{ padding: '10px' }}>
                <h3><span role="img" aria-label="challenge-maker">🙂</span> 챌린지 개설자</h3>
                <Grid item xs={12} style={{ marginTop: '5px' }}>
                  <Typography><strong>{singleChallenge.User.nickname}</strong> / email : {singleChallenge.User.email}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Grid container>
                <Grid item xs={6} style={{ padding: '10px' }}>
                  <Button fullWidth onClick={()=>{history.goBack()}} >
                    뒤로가기
                  </Button>
                </Grid>
                <Grid item xs={6} style={{ padding: '10px' }}>
                  <ColorButton fullWidth onClick={onSetParticipateChallenge}>
                    참여하기!
                  </ColorButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Wrapper>
    </Layout>
  );
}

export default ChallengeDetail