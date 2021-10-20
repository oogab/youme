const express = require('express')
const { ChallengeParticipation, User, Challenge, ChallengeCertificationDay, ChallengeCertificationTime, DailyCertifyChallenge } = require('../models')
const { isLoggedIn } = require('./middlewares')

const router = express.Router()

/**
 * @swagger
 *  /challengeParticipation:
 *    get:
 *      tags:
 *        - challengeParticipation
 *      description: 내가 참여하고 있는 챌린지 목록 가져오기
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  achieve_count:
 *                    type: integer
 *                  UserId:
 *                    type: integer
 *                    description: 챌린지에 참여하고 있는 사용자의 Id
 *                  ChallengeId:
 *                    type: integer
 */
 router.get('/', isLoggedIn, async (req, res, next) => { // GET /challengeParticipation
  try {
    const challengeParticipation = await ChallengeParticipation.findAll({
      where: { UserId: req.user.id },
      include: [{
        model: Challenge,
        include: [{
          model: User,
          attributes: ['id', 'nickname', 'email']
        }, {
          model: ChallengeCertificationDay,
        }, {
          model: ChallengeCertificationTime
        }, {
          model: ChallengeParticipation
        }, {
          model: User,
          as: 'Likers',
          attributes: ['id']
        }]
      }, {
        model: DailyCertifyChallenge
      }]
    })
    res.status(200).json(challengeParticipation)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

/**
 * @swagger
 *  /challengeParticipation:
 *    post:
 *      tags:
 *        - challengeParticipation
 *      description: 챌린지 참여하기
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                achieve_count:
 *                  type: integer
 *                UserId:
 *                  type: integer
 *                ChallengeId:
 *                  type: integer
 *      responses:
 *        '200':
 *          description: Success
 */
router.post('/', isLoggedIn, async (req, res, next) => { // POST /challengeParticipation
  try {
    const alreadyParticipate = await ChallengeParticipation.findOne({
      where: { UserId: req.user.id, ChallengeId: req.body.challengeId }
    })
    if (alreadyParticipate) {
      return res.status(403).send('이미 참여하고 있습니다!')
    }
    const challengeParticipation = await ChallengeParticipation.create({
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      period: req.body.period,
      certification_count: req.body.certification_count,
      total_number_of_certification: req.body.total_number_of_certification,
      UserId: req.user.id,
      ChallengeId: req.body.challengeId
    })
    const fullChallengeParticipation = await ChallengeParticipation.findOne({
      where: { id: challengeParticipation.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: Challenge,
        include: [{
          model: User,
          attributes: ['id', 'email', 'nickname']
        }, {
          model: User,
          as: 'Likers',
          attributes: ['id']
        }, {
          model: ChallengeCertificationTime
        }, {
          model: ChallengeCertificationDay
        }, {
          model: ChallengeParticipation
        }]
      }, {
        model: DailyCertifyChallenge
      }]
    })
    res.status(200).json(fullChallengeParticipation)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

/**
 * @swagger
 *  /challengeParticipation/{challengeId}:
 *    post:
 *      tags:
 *        - challengeParticipation
 *      description: 챌린지 인증하기
 *      parameters:
 *        - in: path
 *          name: challengeId
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: 인증하려는 챌린지의 Id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                img_addr:
 *                  type: string
 *                content:
 *                  type: string
 *      responses:
 *        '200':
 *          description: Success
 */
router.post('/:challengeId', isLoggedIn, async (req, res, next) => {  // POST /challengeParticipation/1
  try {
    const challengeParticipation = await ChallengeParticipation.findOne({
      where: { id: req.params.challengeId }
    })
    const exDailyCertifyChallenge = await DailyCertifyChallenge.findOne({
      where: { ChallengeParticipationId: challengeParticipation.id, certification_datetime: req.body.certification_datetime }
    })
    if (exDailyCertifyChallenge) {
      return res.status(403).send('이미 인증했습니다!')
    }
    const dailyCertifyChallenge = await DailyCertifyChallenge.create({
      img_addr: req.body.img_addr,
      content: req.body.content,
      certification_datetime: req.body.certification_datetime,
      ChallengeParticipationId: challengeParticipation.id
    })
    await ChallengeParticipation.update({
        certification_count: challengeParticipation.certification_count + 1
      },
      { where: { id: challengeParticipation.id } }
    )
    res.status(200).json(dailyCertifyChallenge)
  } catch (error) {
    console.error(error)
    next(error)
  }
})


/**
 * @swagger
 *  /challengeParticipation/{challengeId}:
 *    delete:
 *      tags:
 *        - challengeParticipation
 *      description: 챌린지 탈퇴하기
 *      parameters:
 *        - in: path
 *          name: challengeId
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: 탈퇴하려는 챌린지의 Id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                img_addr:
 *                  type: string
 *                content:
 *                  type: string
 *      responses:
 *        '200':
 *          description: Success
 */
router.delete('/:challengeId', isLoggedIn, async (req, res, next) => {  // DELETE /challengeParticipation/1
  try{
    const challengeParticipation = await ChallengeParticipation.findOne({
      where: { id: req.params.challengeId }
    })
    if (!challengeParticipation) {
      return res.status(403).send('참여하고 있는 챌린지가 없습니다.')
    }
    const deletedRows = await ChallengeParticipation.destroy({
      where: { id: req.params.challengeId }
    })
    console.log(deletedRows)
    res.status(200).json({ deletedChallengeParticipation: req.params.challengeId })
  } catch (error) {
    console.error(error)
    next(error)
  }
})



module.exports = router