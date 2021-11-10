const express = require('express')

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