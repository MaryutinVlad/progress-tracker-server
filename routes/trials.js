const trialsRouter = require('express').Router();

const { getTrials, unlockTrial, completeTrial } = require('../controllers/trials');

trialsRouter.get('/trials', getTrials);

trialsRouter.put('/trials/:id', unlockTrial);

trialsRouter.put('/trials/unlocked/:id', completeTrial);

module.exports = trialsRouter;