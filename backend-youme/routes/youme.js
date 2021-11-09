const express = require('express')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { sequelize, Routine, User, Challenge, RoutinizedHabit, RoutineActiveDay, Habit, DailyAchieveHabit, DailyAchieveRoutine } = require('../models')

const dialogflow = require('dialogflow')
const dotenv = require('dotenv');

dotenv.config()
const projectId = process.env.GOOGLE_PROJECT_ID
const sessionId = process.env.DIALOG_FLOW_SESSION_ID
const languageCode = process.env.DIALOG_FLOW_SESSION_LANGUAGE_CODE

// Create a new dialogflow session
const sessionClient = new dialogflow.SessionsClient()
const sessionPath = sessionClient.sessionPath(projectId, sessionId)

const router = express.Router()

// router.post('/', (req, res, next) => {
//   try {
//     console.log(req.body.message)
//     res.send(req.body.message.trim())
//   } catch (error) {
//     console.error(error)
//     next(error)
//   }
// })

// router.post('/routine', async (req, res, next) => {
//   const userId = req.body.userId
  
//   try {
//     const routines = await Routine.findAll({
//       where: { UserId: userId }
//     })
//     if (!routines) {
//       return res.status(400).send('응답 오늘 루틴이 없습니다!')
//     }
//     const routine_list = routines.map((routine) => routine.dataValues.name)
//     talk = `응답 오늘 루틴은 ${routine_list} 입니다.`
//     console.log(talk)

//     return res.status(200).send(talk)
//   } catch (error) {
//     console.error(error)
//     next(error)
//   }
// })

router.post('/challenge', async (req, res, next) => {
  const userId = req.body.userId

  try {
    const challenges = await Challenge.findAll({
      where: { UserId: userId }
    })
    console.log(challenges)
    if (challenges.length == 0) {
      return res.status(400).send('응답 오늘 챌린지가 없습니다!')
    }
    const challenge_list = challenges.map((challenge) => challenge.dataValues.name)
    talk  = `응답 오늘 챌린지는 ${challenge_list} 입니다.`
    console.log(talk)

    return res.status(200).send(talk)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.post('/textQuery', async (req, res) => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: req.body.message.trim(),
        languageCode: languageCode
      }
    }
  }

  // Send request and log result
  const responses = await sessionClient.detectIntent(request)
  console.log(responses[0].queryResult.diagnosticInfo)
  console.log('Detected intent')
  const result = responses[0].queryResult
  console.log(`Query: ${result.queryText}`)
  console.log(`Response: ${result.fulfillmentText}`)

  res.send('응답 ' + result.fulfillmentText)
})

module.exports = router