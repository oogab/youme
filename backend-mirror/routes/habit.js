const express = require('express')
const { User, Habit, RoutinizedHabit, sequelize } = require('../models')
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
  const t = await sequelize.transaction();
  try {
    await RoutinizedHabit.destroy({
      where : {HabitId: req.params.habitId}
    },{ transaction: t })
    await Habit.destroy({
      where: { id:req.params.habitId }
    },{ transaction: t })
    await t.commit();
    res.status(200).json("success")
  } catch (error) {
    await t.rollback();
    console.error(error)
    next(error)
  }
})
module.exports = router