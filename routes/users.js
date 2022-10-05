const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { validate } = require('../controllers/users');

userRouter.get('/validate', validate );

module.exports = userRouter;