import React, { useCallback, useState } from 'react'
import { Box, Grid, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { categories } from '../../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import CardList from '../CardList';
import { useHistory } from 'react-router-dom';
import {
  LOAD_ABILITY_CHALLENGES_REQUEST,
  LOAD_ASSET_CHALLENGES_REQUEST,
  LOAD_CHALLENGES_REQUEST,
  LOAD_HOBBY_CHALLENGES_REQUEST,
  LOAD_LIFE_CHALLENGES_REQUEST,
  LOAD_MEAL_CHALLENGES_REQUEST,
  LOAD_STUDY_CHALLENGES_REQUEST,
  LOAD_WORKOUT_CHALLENGES_REQUEST
} from '../../../reducers/challenge';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box mt={2}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ChallengeCategory = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    challenges,
    workoutChallenges,
    studyChallenges,
    lifeChallenges,
    mealChallenges,
    abilityChallenges,
    hobbyChallenges,
    assetChallenges,
  } = useSelector((state) => state.challenge)
  const [value, setValue] = useState(0);

  function a11yProps(index) {
    return {
      id: `scrollable-prevent-tab-${index}`,
      'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
  }

  const [category, setCategory] = useState(0)
  const onSetCategory = useCallback((i) => {
    setCategory(i)
    if (i === 0) {
      dispatch({
        type: LOAD_CHALLENGES_REQUEST
      })
    }
    else if (i === 1) {
      dispatch({
        type: LOAD_WORKOUT_CHALLENGES_REQUEST
      })
    } else if (i === 2) {
      dispatch({
        type: LOAD_STUDY_CHALLENGES_REQUEST
      })
    } else if (i === 3) {
      dispatch({
        type: LOAD_LIFE_CHALLENGES_REQUEST
      })
    } else if (i === 4) {
      dispatch({
        type: LOAD_MEAL_CHALLENGES_REQUEST
      })
    } else if (i === 5) {
      dispatch({
        type: LOAD_ABILITY_CHALLENGES_REQUEST
      })
    } else if (i === 6) {
      dispatch({
        type: LOAD_HOBBY_CHALLENGES_REQUEST
      })
    } else if (i === 7) {
      dispatch({
        type: LOAD_ASSET_CHALLENGES_REQUEST
      })
    }
  }, [dispatch])

  const onChallengeMore = useCallback(() => {
    history.push(`/ChallengeMore/${category}`)
  }, [history, category])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Paper style={{ marginTop: '5px' }} >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="전체" {...a11yProps(0)} onClick={() => onSetCategory(0)} />
          {
            categories.map((subject, i) => {
              return <Tab key={subject.name} label={subject.label} {...a11yProps(i+1)} onClick={() => onSetCategory(i+1)} />
            })
          }
        </Tabs>
      </Paper>
      <div style={{ marginTop: '5px'}}>
        <span onClick={onChallengeMore} style={{ color: 'GrayText', cursor: 'pointer' }}>{category === 0 ? '전체' : categories[category-1].label} 더보기</span>
      </div>
      <TabPanel value={value} index={0}>
        <Grid container>
        {
          challenges.length !== 0 ?
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <CardList challenges={challenges}/>
            </Grid>
          :
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <Typography component={'div'} >전체 챌린지를 준비중입니다!</Typography>
            </Grid>
        }
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {
          workoutChallenges.length !== 0 ?
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <CardList challenges={workoutChallenges}/>
            </Grid>
          :
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <Typography component={'div'} >운동 챌린지를 준비중입니다!</Typography>
            </Grid>
        }
      </TabPanel>
      <TabPanel value={value} index={2}>
        {
          studyChallenges.length !== 0 ?
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <CardList challenges={studyChallenges} />
            </Grid>
          :
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <Typography component={'div'} >공부 챌린지를 준비중입니다!</Typography>
            </Grid>
        }
      </TabPanel>
      <TabPanel value={value} index={3}>
        {
          lifeChallenges.length !== 0 ?
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <CardList challenges={lifeChallenges}/>
            </Grid>
          :
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <Typography component={'div'} >생활 챌린지를 준비중입니다!</Typography>
            </Grid>
        }
      </TabPanel>
      <TabPanel value={value} index={4}>
      {
          mealChallenges.length !== 0 ?
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <CardList challenges={mealChallenges}/>
            </Grid>
          :  
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <Typography component={'div'} >식사 챌린지를 준비중입니다!</Typography>
            </Grid>
        }
      </TabPanel>
      <TabPanel value={value} index={5}>
        {
          abilityChallenges.length !== 0 ?
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <CardList challenges={abilityChallenges}/>
            </Grid>
          :
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <Typography component={'div'} >역량 챌린지를 준비중입니다!</Typography>
            </Grid>
        }
      </TabPanel>
      <TabPanel value={value} index={6}>
        {
          hobbyChallenges.length !== 0 ?
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <CardList challenges={hobbyChallenges}/>
            </Grid>
          :
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <Typography component={'div'} >취미 챌린지를 준비중입니다!</Typography>
            </Grid>
        }
      </TabPanel>
      <TabPanel value={value} index={7}>
        {
          assetChallenges.length !== 0 ?
              <Grid item xs={12} style={{ textAlign: 'center' }} >
                <CardList challenges={assetChallenges}/>
              </Grid>
          :
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <Typography component={'div'} >자산 챌린지를 준비중입니다!</Typography>
            </Grid>
        }
      </TabPanel>
    </>
  )
}

export default ChallengeCategory