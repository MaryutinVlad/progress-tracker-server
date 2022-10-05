const trialsRouter = require('express').Router();

const { getTrials } = require('../controllers/trials');

trialsRouter.get('/trials', getTrials);

module.exports = trialsRouter;