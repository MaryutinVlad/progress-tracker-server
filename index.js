const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');

const auth = require('./middlewares/auth');

const userRouter = require('./routes/users');
const { login, createUser } = require('./controllers/users');

const activitiesRouter = require('./routes/activities');
const trialsRouter = require('./routes/trials');
const achievementsRouter = require('./routes/achievements');

const app = express();

const { PORT = 5000 } = process.env;

mongoose.connect('mongodb://localhost:27017/progress-trackerDB');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(20),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  }).unknown(true),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use('/', auth, userRouter);
app.use('/', auth, trialsRouter);
app.use('/', auth, activitiesRouter);
app.use('/', achievementsRouter);

app.use(errors());
app.use('/', (req, res, next) => next(new NotFoundError('Wrong path')));
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
      ? 'Server error'
      : message,
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})