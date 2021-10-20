import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { useSelector } from 'react-redux'
import MoreCardList from '../../../components/Challenge/MoreCardList'
import Layout from '../../../layout'

const MoreChallenges = ({match}) => {
  const { category } = match.params
  const {
    challenges,
    newChallenges,
    recChallenges,
    workoutChallenges,
    studyChallenges,
    lifeChallenges,
    mealChallenges,
    abilityChallenges,
    hobbyChallenges,
    assetChallenges,
  } = useSelector((state) => state.challenge)

  const getCategoryName = () => {
    if (category === 'new') {
      return '신규'
    } else if (category === 'recommended') {
      return '추천'
    } else if (category === '0') {
      return '전체'
    } else if (category === '1') {
      return '운동'
    } else if (category === '2') {
      return '공부'
    } else if (category === '3') {
      return '생활'
    } else if (category === '4') {
      return '식사'
    } else if (category === '5') {
      return '역량'
    } else if (category === '6') {
      return '취미'
    } else if (category === '7') {
      return '자산'
    }
  }

  return (
    <Layout>
      <Grid container style={{ marginTop: '10px', marginBottom: '10px' }}>
        <Grid item xs={12}>
          <Paper style={{ padding: '10px'}}>
            <h3>{getCategoryName()} 챌린지</h3>
          </Paper>
        </Grid>
      </Grid>
      <div hidden={category !== 'new'}>
        <MoreCardList challenges={newChallenges} />
      </div>
      <div hidden={category !== 'recommended'}>
        <MoreCardList challenges={recChallenges} />
      </div>
      <div hidden={category !== '0'}>
        <MoreCardList challenges={challenges} />
      </div>
      <div hidden={category !== '1'}>
        <MoreCardList challenges={workoutChallenges} />
      </div>
      <div hidden={category !== '2'}>
        <MoreCardList challenges={studyChallenges} />
      </div>
      <div hidden={category !== '3'}>
        <MoreCardList challenges={lifeChallenges} />
      </div>
      <div hidden={category !== '4'}>
        <MoreCardList challenges={mealChallenges} />
      </div>
      <div hidden={category !== '5'}>
        <MoreCardList challenges={abilityChallenges} />
      </div>
      <div hidden={category !== '6'}>
        <MoreCardList challenges={hobbyChallenges} />
      </div>
      <div hidden={category !== '7'}>
        <MoreCardList challenges={assetChallenges} />
      </div>
    </Layout>
  )
}

export default MoreChallenges