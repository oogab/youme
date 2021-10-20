const express = require('express')
let moment = require('moment')
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { User, Habit, RoutinizedHabit, sequelize, Routine, DailyAchieveHabit, DailyAchieveRoutine } = require('../models');
const routinizedHabit = require('../models/routinizedHabit');
const { isLoggedIn } = require('./middlewares')

const router = express.Router()

// 내 습관 목록 불러오기
/**
 * @swagger
 *  /habit:
 *    get:
 *      tags:
 *        - habit
 *      description: 내 습관 목록 불러오기
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
 *                  content:
 *                    type: text
 *                  time_required:
 *                    type: integer
 *                  UserId:
 *                    type: integer
 *              example:
 *                id: 1
 *                name: 이불 개기
 *                content: 이불 개기
 *                time_required: 10
 *                UserId: 1
 */
router.get('/', isLoggedIn, async (req, res, next) => { // GET /habit
  try {
    const habits = await Habit.findAll({
      where: { UserId: req.user.id }
    })
    res.status(200).json(habits)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// 습관 만들기
/**
 * @swagger
 *  /habit:
 *    post:
 *      tags:
 *        - habit
 *      description: 내 습관 항목 만들기
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *                content:
 *                  type: text
 *                time_required:
 *                  type: integer
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
 *                  content:
 *                    type: text
 *                  time_required:
 *                    type: integer
 *                  UserId:
 *                    type: integer
 *              example:
 *                id: 1
 *                name: 이불 개기
 *                content: 이불 개기
 *                time_required: 10
 *                UserId: 1
 */
router.post('/', isLoggedIn, async (req, res, next) => { // POST /habit
  try {
    const habit = await Habit.create({
      name: req.body.name,
      content: req.body.content,
      time_required: req.body.time_required,
      assist_link: req.body.assist_link,
      UserId: req.user.id
    })
    res.status(200).json(habit)
  } catch (error) {
    console.error(error)
    next(error)
  }
})
// 습관 수정하기
/**
 * @swagger
 *  /habit/{habitId}:
 *    put:
 *      tags:
 *        - habit
 *      description: 내 습관 수정하기
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                content:
 *                  type: text
 *                time_required:
 *                  type: integer
 *      parameters:
 *        - in: path
 *          name: habitId
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: 습관 Id
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
 *                  content:
 *                    type: text
 *                  time_required:
 *                    type: integer
 *                  UserId:
 *                    type: integer
 *              example:
 *                id: 1
 *                name: 이불 개기
 *                content: 이불 개기
 *                time_required: 10
 *                UserId: 1
 */
 router.put('/:habitId', isLoggedIn, async (req, res, next) => { // PUT /habit/{habitId}
  const t = await sequelize.transaction();
  try {
    await Habit.update({
      name: req.body.name,
      content: req.body.content,
      time_required: req.body.time_required,
      assist_link: req.body.assist_link,
    },{where: { UserId: req.user.id, id:req.params.habitId }},{ transaction: t })
    const habit = await Habit.findOne({
      where: { id:req.params.habitId}
    },{ transaction: t })
    await t.commit();
    res.status(200).json(habit)
  } catch (error) {
    await t.rollback();
    console.error(error)
    next(error)
  }
})
// 습관 삭제하기
/**
 * @swagger
 *  /habit/{habitId}:
 *    delete:
 *      tags:
 *        - habit
 *      description: 내 습관 삭제하기
 *      parameters:
 *        - in: path
 *          name: habitId
 *          required: true
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: 습관 Id
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
 *                  content:
 *                    type: text
 *                  time_required:
 *                    type: integer
 *                  UserId:
 *                    type: integer
 *              example:
 *                id: 1
 *                name: 이불 개기
 *                content: 이불 개기
 *                time_required: 10
 *                UserId: 1
 */
 router.delete('/:habitId', isLoggedIn, async (req, res, next) => { // PUT /habit/{habitId}
  
  try {
    //habitId를 가지고 있는 모든 루틴 아이디 검색
    const routineIds = await RoutinizedHabit.findAll({
      attributes: ['RoutineId'],
      where : {HabitId: req.params.habitId},
      group:['RoutineId']
    })
    
    for(let i=0;i<routineIds.length;i++){
      let nowRoutizedHabits = await RoutinizedHabit.findAll({
        where:{Routineid : routineIds[i].RoutineId,
          [Op.not]:{HabitId:req.params.habitId}
        },
        include: [{
          model: DailyAchieveHabit,
          required: false,
          where:{
            achieve_datetime:{
              [Op.between]: [moment().startOf('day'), moment().endOf('day')],
            }
          }
        }]
      })
      nowRoutizedHabits.sort((a,b)=>{return a.order-b.order})
      let achieveCnt = 0;
      for(let j=0;j<nowRoutizedHabits.length;j++){
        await RoutinizedHabit.update(
          {order: j},
          {
            where: { id: nowRoutizedHabits[j].id }
          }
        )
        if(nowRoutizedHabits[j].DailyAchieveHabits.length>0){
          achieveCnt++
        }
      }
      if(nowRoutizedHabits.length==achieveCnt){
        await DailyAchieveRoutine.create({
          authorized: true,
          achieve_datetime: moment().toDate(),
          RoutineId: routineIds[i].RoutineId
        })
      }
      
    }
    await RoutinizedHabit.destroy({
      where : {HabitId: req.params.habitId}
    })
    await Habit.destroy({
      where: { id:req.params.habitId }
    })
    res.status(200).json("success")
  } catch (error) {
    console.error(error)
    next(error)
  }
})
module.exports = router