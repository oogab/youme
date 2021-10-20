const express = require('express')
let moment = require('moment')
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Routine, Habit, RoutinizedHabit, DailyAchieveHabit, sequelize, DailyAchieveRoutine } = require('../models')
const { isLoggedIn } = require('./middlewares')

const router = express.Router()

// 루틴에 습관 등록하기
/**
 * @swagger
 *  /routinizedHabit/{routineId}:
 *    post:
 *      tags:
 *      - routinizedHabit
 *      description: 루틴에 습관 등록하기
 *      parameters:
 *        - in: path
 *          name: routineId
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: 습관을 추가하려는 루틴의 Id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                order:
 *                  type: integer
 *                achieve_count:
 *                  type: integer
 *                  description: 초기에 무조건 0으로 고정
 *                HabitId:
 *                  type: integer
 *      responses:
 *        '200':
 *          description: Success
 */
router.post('/:routineId', isLoggedIn, async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const routinizedHabit = await RoutinizedHabit.create({
      order: req.body.order,
      achieve_count: req.body.achieve_count,
      RoutineId: req.params.routineId,
      HabitId: req.body.habitId
    },{ transaction: t })

    await DailyAchieveRoutine.destroy({
      where:{
        RoutineId:req.params.routineId,
        achieve_datetime:{
          [Op.between]: [moment().startOf('day'), moment().endOf('day')],
        }
      }
    },{ transaction: t })
    await t.commit();
    const result = await RoutinizedHabit.findOne({
      where:{id: routinizedHabit.id},
      include: [{
        model: Habit,
      }]
    })
    res.status(200).json(result)
  } catch (error) {
    await t.rollback();
    console.error(error)
    next(error)
  }
})

// 루틴 내 습관 순서 변경 후 저장
/**
 * @swagger
 *  /routinizedHabit/order:
 *    patch:
 *      tags:
 *        - routinizedHabit
 *      description: 루틴 내 습관 순서 변경 후 저장
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                routineId:
 *                  type: integer
 *                habits:
 *                  type: array
 *                  description: habitId, order 쌍의 배열
 *      responses:
 *        '200':
 *          description: Success
 */
router.put('/order', isLoggedIn, async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    for(let i=0; i<req.body.habits.length;i++){
      let routinizedHabit = req.body.habits[i]
      await RoutinizedHabit.update(
        {order: i},
        {
          where: { id: routinizedHabit.id }
        }
        ,{ transaction: t }
      )
    }
    await t.commit();
    res.status(200).json(req.body.habits)
  } catch (error) {
    await t.rollback();
    console.error(error)
    next(error)
  }
})

// 루틴 내 습관 실행 완료 체크하기
/**
 * @swagger
 *  /routinizedHabit/:
 *    post:
 *      tags:
 *      - routinizedHabit
 *      description: 루틴 내 습관 실행 완료 체크하기
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                routineId:
 *                  type: integer
 *                habitId:
 *                  type: integer
 *      responses:
 *        '200':
 *          description: Success
 */
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const routinizedHabit = await RoutinizedHabit.findOne({
      where: { RoutineId: req.body.routineId, HabitId: req.body.habitId }
    })
    const existDailyAchiveHabit = await DailyAchieveHabit.findOne({
      where:{
        RoutinizedHabitId: routinizedHabit.id,
        achieve_datetime:{
          [Op.between]: [moment().startOf('day'), moment().endOf('day')],
        }
      }
    })
    if(existDailyAchiveHabit){
      res.status(200).json(existDailyAchiveHabit)
      return
    }

    const dailyAchieveHabit =await DailyAchieveHabit.create({
      authorized: true,
      achieve_datetime: moment().toDate(),
      RoutinizedHabitId: routinizedHabit.id
    })

    res.status(200).json(dailyAchieveHabit)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// 루틴 내 습관 삭제하기
/**
 * @swagger
 *  /routinizedHabit/{routinizedHabitId}:
 *    delete:
 *      tags:
 *      - routinizedHabit
 *      description: 루틴 내 습관 삭제하기
 *      parameters:
 *        - in: path
 *          name: routinizedHabitId
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: 루틴습관 Id
 *      responses:
 *        '200':
 *          description: Success
 */
router.delete('/:routinizedHabitId', isLoggedIn, async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    await DailyAchieveHabit.destroy({
      where:{RoutinizedHabitId:req.params.routinizedHabitId}
    },{ transaction: t })

    await RoutinizedHabit.destroy({
      where: { id: req.params.routinizedHabitId}
    },{ transaction: t })
    await t.commit();
    res.status(200).json()
  } catch (error) {
    await t.rollback();
    console.error(error)
    next(error)
  }
})

// // 루틴에 저장된 습관 목록 불러오기
// /**
//  * @swagger
//  *  /routinizedHabit/{routineId}:
//  *    get:
//  *      tags:
//  *      - routinizedHabit
//  *      description: 루틴에 저장된 습관 목록 불러오기
//  *      parameters:
//  *        - in: path
//  *          name: routineId
//  *          required: true
//  *          schema:
//  *            type: integer
//  *            minimum: 1
//  *          description: 저장된 습관 목록을 불러오려는 루틴의 Id
//  *      responses:
//  *        '200':
//  *          description: Success
//  *          content:
//  *            application/json:
//  *              schema:
//  *                type: object
//  *                properties:
//  *                  order:
//  *                    type: integer
//  *                  assist_content:
//  *                    type: text
//  *                  assist_link:
//  *                    type: string
//  *                  achieve_count:
//  *                    type: integer
//  *                    description: 초기에 무조건 0으로 고정
//  *                  HabitId:
//  *                    type: integer
//  *                  RoutineId:
//  *                    type: integer
//  */
// router.get('/:routineId', isLoggedIn, async (req, res, next) => {
//   try {
//     const routinizedHabits = await RoutinizedHabit.findAll({
//       where: { RoutineId: req.params.routineId },
//       include: [{
//         model: DailyAchieveHabit,
//       }]
//     })
//     res.status(200).json(routinizedHabits)
//   } catch (error) {
//     console.error(error)
//     next(error)
//   }
// })

module.exports = router