import React, { useState } from 'react'
import { Box, Grid, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { categories } from '../../../config/config';
import { useSelector } from 'react-redux';
import ChallengeItem from '../../../components/Home/ChallengeItem/index';

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
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

const MyChallengeHome = () => {
  const { myChallenges } = useSelector((state) => state.challenge)
  const [value, setValue] = useState(0);

  function a11yProps(index) {
    return {
      id: `scrollable-prevent-tab-${index}`,
      'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
  }

  const workoutChallenges = myChallenges.filter((challenge) => challenge.Challenge.category=== 1)
  const studyChallenges = myChallenges.filter((challenge) => challenge.Challenge.category=== 2)
  const lifeChallenges = myChallenges.filter((challenge) => challenge.Challenge.category=== 3)
  const mealChallenges = myChallenges.filter((challenge) => challenge.Challenge.category === 4)
  const abilityChallenges = myChallenges.filter((challenge) => challenge.Challenge.category === 5)
  const hobbyChallenges = myChallenges.filter((challenge) => challenge.Challenge.category === 6)
  const assetChallenges = myChallenges.filter((challenge) => challenge.Challenge.category === 7)

  // console.log(workoutChallenges.length)
  // console.log(studyChallenges)
  // console.log(lifeChallenges)
  // console.log(mealChallenges)
  // console.log(abilityChallenges)

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
          <Tab label="전체" {...a11yProps(0)} />
          {
            categories.map((subject, i) => {
              return <Tab key={subject.name} label={subject.label} {...a11yProps(i+1)}/>
            })
          }
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <Grid container spacing={2}>
        {
          myChallenges.length !== 0 ?
          (
            myChallenges.map((challenge) => {
              return (
                <Grid key={challenge.id} item xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }} >
                  <ChallengeItem challenge={challenge} />
                </Grid>
              )
            })
          )
          :
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <Typography component={'div'} >전체 챌린지에 도전해보세요!</Typography>
            </Grid>
        }
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={2}>
        {
          workoutChallenges.length !== 0 ?
          (
            workoutChallenges.map((challenge) => {
              return (
                <Grid key={challenge.id} item xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }} >
                  <ChallengeItem challenge={challenge} />
                </Grid>
              )
            })
          )
          :
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <Typography component={'div'} >운동 챌린지에 도전해보세요!</Typography>
            </Grid>
        }
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Grid container spacing={2}>
        {
          studyChallenges.length !== 0 ?
          (
            studyChallenges.map((challenge) => {
              return (
                <Grid key={challenge.id} item xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }} >
                  <ChallengeItem challenge={challenge} />
                </Grid>
              )
            })
          )
          :
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <Typography component={'div'} >공부 챌린지에 도전해보세요!</Typography>
            </Grid>
        }
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <Grid container spacing={2}>
        {
          lifeChallenges.length !== 0 ?
          (
            lifeChallenges.map((challenge) => {
              return (
                <Grid key={challenge.id} item xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }} >
                  <ChallengeItem challenge={challenge} />
                </Grid>
              )
            })
          )
          :
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <Typography component={'div'} >생활 챌린지에 도전해보세요!</Typography>
            </Grid>
        }
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <Grid container spacing={2}>
      {
          mealChallenges.length !== 0 ?
          (
            mealChallenges.map((challenge) => {
              return (
                <Grid key={challenge.id} item xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }} >
                  <ChallengeItem challenge={challenge} />
                </Grid>
              )
            })
          )
          :  
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <Typography component={'div'} >식사 챌린지에 도전해보세요!</Typography>
            </Grid>
        }
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={5}>
      <Grid container spacing={2}>
        {
          abilityChallenges.length !== 0 ?
          (
            abilityChallenges.map((challenge) => {
              return (
                <Grid key={challenge.id} item xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }} >
                  <ChallengeItem challenge={challenge} />
                </Grid>
              )
            })
          )
          :
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <Typography component={'div'} >역량 챌린지에 도전해보세요!</Typography>
            </Grid>
        }
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={6}>
      <Grid container spacing={2}>
        {
          hobbyChallenges.length !== 0 ?
          (
            hobbyChallenges.map((challenge) => {
              return (
                <Grid key={challenge.id} item xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }} >
                  <ChallengeItem challenge={challenge} />
                </Grid>
              )
            })
          )
          :
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <Typography component={'div'} >취미 챌린지에 도전해보세요!</Typography>
            </Grid>
        }
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={7}>
      <Grid container spacing={2}>
        {
          assetChallenges.length !== 0 ?
          (
            assetChallenges.map((challenge) => {
              return (
                <Grid key={challenge.id} item xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }} >
                  <ChallengeItem challenge={challenge} />
                </Grid>
              )
            })
          )
          :
            <Grid item xs={12} style={{ textAlign: 'center' }} >
              <Typography component={'div'} >자산 챌린지에 도전해보세요!</Typography>
            </Grid>
        }
        </Grid>
      </TabPanel>
    </>
  )
}

export default MyChallengeHome