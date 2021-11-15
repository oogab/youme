const express = require('express')

const dialogflow = require('dialogflow')
const dotenv = require('dotenv');
const { DailyAchieveRoutine, Routine, RoutineActiveDay } = require('../models');
const { Op } = require('sequelize')

dotenv.config()
const projectId = process.env.GOOGLE_PROJECT_ID
const sessionId = process.env.DIALOG_FLOW_SESSION_ID
const languageCode = process.env.DIALOG_FLOW_SESSION_LANGUAGE_CODE

// Create a new dialogflow session
const sessionClient = new dialogflow.SessionsClient()
const sessionPath = sessionClient.sessionPath(projectId, sessionId)

const router = express.Router()


router.post('/textQuery', async (req, res) => {
  const userId = req.body.userId

  message = req.body.message.trim()
  if (message.search(/심심/) >= 0) {
    const d = new Date()
    const td = new Date(d)

    const yesterday = td.setDate(d.getDate() - 1)
    const today = td.setDate(d.getDate() + 1)

    let day = d.getDay()-1
    if (day === -1) {
      day = 6
    }

    const routine = await Routine.findAll({
      where: {UserId: userId},
      include: {
        model: RoutineActiveDay,
        where: { day_of_week: day, active: true }
      },
      attributes: ['id'],
      raw: true,
      nest: true
    })
    const routineId = routine.map(r => r.id)
    console.log(routineId.length)
    // if (!routine) {

    // }
    
    
    // let tomorrow = td.setDate(td.getDate()+1)
    // tomorrow.setHours(0,0,0,0)

    console.log(yesterday, today)

    const checkRoutineComplete = await DailyAchieveRoutine.findAll({
      where: {
        RoutineId: routineId,
        achieve_datetime: {
          [Op.between] : [yesterday, today]
        }
      },
      raw: true
    })
    if (checkRoutineComplete.length !== routineId.length) {
      return res.send('응답 아직 못 끝낸 루틴이 있습니다! 루틴을 먼저 마무리하세요!')
    }
  }
  console.log(message.search(/심심/))

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