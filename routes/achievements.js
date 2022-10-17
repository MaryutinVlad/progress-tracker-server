const achievementsRouter = require('express').Router();

const { getAchievements } = require('../controllers/achievements');

achievementsRouter.get('/achievements', getAchievements);

module.exports = achievementsRouter;