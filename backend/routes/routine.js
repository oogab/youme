const express = require('express')
let moment = require('moment')
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { sequelize, Routine, User, RoutinizedHabit, RoutineActiveDay, Habit, DailyAchieveHabit, DailyAchieveRoutine } = require('../models');
const routinizedHabit = require('../models/routinizedHabit');
const { isLoggedIn } = require('./middlewares')

const router = express.Router()

// 루틴 목록 가져오기
/**
 * @swagger
 *  /routine:
 *    get:
 *      tags:
 *        - routine
 *      description: 내 루틴 목록 가져오기
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
 *                  name:
 *                    type: string
 *                  alarm:
 *                    type: bool
 *                  UserId:
 *                    type: integer
 */
router.get('/', isLoggedIn, async (req, res, next) => { // GET /routine
  try {
    const routines = await Routine.findAll({
      where: { UserId: req.user.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: RoutinizedHabit,
        include: [{
          model: Habit,
        },{
          model: DailyAchieveHabit,
          required: false,
          where:{
            achieve_datetime:{
              [Op.between]: [moment().startOf('day'), moment().endOf('day')],
            }
          }
        }]
      }, {
        model: RoutineActiveDay
      },{
        model: DailyAchieveRoutine,
        required: false,
        where:{
          achieve_datetime:{
            [Op.between]: [moment().startOf('day'), moment().endOf('day')],
          }
        }
      }]
    })
    // console.log(routines)
    res.status(200).json(routines)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// 오늘의 루틴 목록 가져오기
/**
 * @swagger
 *  /routine/today:
 *    get:
 *      tags:
 *        - routine
 *      description: 오늘의 루틴 목록 가져오기
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
 *                  name:
 *                    type: string
 *                  alarm:
 *                    type: bool
 *                  UserId:
 *                    type: integer
 */
 router.get('/today', isLoggedIn, async (req, res, next) => { // GET /routine
  try {
    /*
    월 화 수 목 금 토 일
    0  1  2  3  4  5  6 ->DB
    1  2  3  4  5  6  0 -> 모멘트
    */

    let today = moment().day()
    today = today==0?6:today-1
    console.log(moment().format('YYYY-MM-DD hh:mm:ss ha z'))
    const todayRoutines = await RoutineActiveDay.findAll({
      where: {
        day_of_week:today,
        active:true
      },
      attributes: ['RoutineId']
    })

    let routineIds = []
    for(let i=0;i<todayRoutines.length;i++){
      routineIds.push(todayRoutines[i].RoutineId)
    }
    const routines = await Routine.findAll({
      where: { 
        UserId: req.user.id,
        id: {[Op.in]:routineIds},
      },
      include: [{
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: RoutinizedHabit,
        include: [{
          model: Habit,
        },{
          model: DailyAchieveHabit,
          required: false,
          where:{
            achieve_datetime:{
              [Op.between]: [moment().startOf('day'), moment().endOf('day')],
            }
          }
        }]
      }, {
        model: RoutineActiveDay,
      },{
        model: DailyAchieveRoutine,
        required: false,
        where:{
          achieve_datetime:{
            [Op.between]: [moment().startOf('day'), moment().endOf('day')],
          }
        }
      }]
    })
    // console.log(routines)
    res.status(200).json(routines)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// 루틴 생성하기
/**
 * @swagger
 *  /routine:
 *    post:
 *      tags:
 *        - routine
 *      description: 새로운 루틴 생성하기
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                alarm:
 *                  type: string
 *                active_day_of_week:
 *                  type: array
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
 *                  name:
 *                    type: string
 *                  alarm:
 *                    type: bool
 *                  UserId:
 *                    type: integer
 *                  RoutineActiveDay:
 *                    type: array
 */
router.post('/', isLoggedIn, async (req, res, next) => { // POST /routine
  try {
    const routine = await Routine.create({
      name: req.body.name,
      alarm: req.body.alarm,
      UserId: req.user.id,
    })
    for(let i=0;i<req.body.active_day_of_week.length;i++){
      let v = req.body.active_day_of_week[i]
      await RoutineActiveDay.create({
        RoutineId: routine.id,
        day_of_week: i,
        start_time: v.start_time,
        active: v.active,
      })
    }
    const fullRoutine = await Routine.findOne({
      where: {id: routine.id},
      include: [{
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: RoutinizedHabit,
        include: [{
          model: Habit,
        },{
          model: DailyAchieveHabit,
          required: false,
          where:{
            achieve_datetime:{
              [Op.between]: [moment().startOf('day'), moment().endOf('day')],
            }
          }
        }]
      }, {
        model: RoutineActiveDay
      },{
        model: DailyAchieveRoutine,
        required: false,
        where:{
          achieve_datetime:{
            [Op.between]: [moment().startOf('day'), moment().endOf('day')],
          }
        }
      }]
    })
    res.status(200).json(fullRoutine)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// 루틴 설정 수정하기
/**
 * @swagger
 *  /routine:
 *    patch:
 *      tags:
 *        - routine
 *      description: 루틴 설정 수정하기
 *      parameters:
 *        - in: path
 *          name: routineId
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                alarm:
 *                  type: string
 *                active_day_of_week:
 *                  type: array
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
 *                  name:
 *                    type: string
 *                  alarm:
 *                    type: bool
 *                  UserId:
 *                    type: integer
 *                  RoutineActiveDay:
 *                    type: array
 */
router.put('/:routineId', isLoggedIn, async (req, res, next) => { // PATCH /routine/:routineId
  try {
    await Routine.update({
      name: req.body.name,
      alarm: req.body.alarm,
    },{
      where: { id: req.params.routineId },
    })
    for(let i=0;i<req.body.active_day_of_week.length;i++){
      let v = req.body.active_day_of_week[i]
      await RoutineActiveDay.update({
        start_time: v.start_time,
        active: v.active,
      }, {
        where: { RoutineId: req.params.routineId, day_of_week: i }
      })
    }
    const routine = await Routine.findOne({
      where: {id: req.params.routineId},
      include: [{
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: RoutinizedHabit,
        include: [{
          model: Habit,
        },{
          model: DailyAchieveHabit,
          required: false,
          where:{
            achieve_datetime:{
              [Op.between]: [moment().startOf('day'), moment().endOf('day')],
            }
          }
        }]
      }, {
        model: RoutineActiveDay
      },{
        model: DailyAchieveRoutine,
        required: false,
        where:{
          achieve_datetime:{
            [Op.between]: [moment().startOf('day'), moment().endOf('day')],
          }
        }
      }]
    })
    res.status(200).json(routine)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// 루틴 삭제하기
/**
 * @swagger
 *  /routine/{routineId}:
 *    delete:
 *      tags:
 *        - routine
 *      description: 루틴 삭제하기
 *      parameters:
 *        - in: path
 *          name: routineId
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *      responses:
 *        '200':
 *          description: Success
 */
router.delete('/:routineId', isLoggedIn, async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    let routinizedHabitIds = await RoutinizedHabit.findAll({
      where: {RoutineId : req.params.routineId},
      attributes: ['id'],
      group:['id']
    },{ transaction: t })
    for(let i=0;i<routinizedHabitIds.length;i++){
      await DailyAchieveHabit.destroy({
        where:{RoutinizedHabitId : routinizedHabitIds[i].id}
      },{ transaction: t })
    }
    await RoutinizedHabit.destroy({
      where: {RoutineId : req.params.routineId}
    },{ transaction: t })
    await DailyAchieveRoutine.destroy({
      where: {RoutineId : req.params.routineId}
    },{ transaction: t })
    await RoutineActiveDay.destroy({
      where: {RoutineId : req.params.routineId}
    },{ transaction: t })
    await Routine.destroy({
      where: { id: req.params.routineId }
    },{ transaction: t })
    await t.commit();
    res.status(200).json('Success')
  } catch (error) {
    await t.rollback();
    console.error(error)
    next(error)
  }
})

// 루틴 완료 체크하기
/**
 * @swagger
 *  /routine/complete:
 *    post:
 *      tags:
 *      - routinizedHabit
 *      description: 루틴 완료 체크하기
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                routineId:
 *                  type: integer
 *      responses:
 *        '200':
 *          description: Success
 */
 router.post('/complete', isLoggedIn, async (req, res, next) => {
  try {
    const existDailyAchiveRoutine = await DailyAchieveRoutine.findOne({
      where:{
        RoutineId: req.body.routineId,
        achieve_datetime:{
          [Op.between]: [moment().startOf('day'), moment().endOf('day')],
        }
      }
    })
    if(existDailyAchiveRoutine){
      res.status(500).json(existDailyAchiveRoutine)
      return
    }

    const dailyAchieveRoutine =await DailyAchieveRoutine.create({
      authorized: true,
      achieve_datetime: moment().toDate(),
      RoutineId: req.body.routineId
    })

    res.status(200).json(dailyAchieveRoutine)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router