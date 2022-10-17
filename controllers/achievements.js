const User = require('../models/users');
const Achievements = require('../models/achievements');

module.exports.getAchievements = (_req, res, next) => {
  Achievements.find({})
	  .then((achievements) => {
			res.send(achievements);
		})
		.catch(() => {
			next('Error on getting achievements');
		})
}