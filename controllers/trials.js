const Trials = require('../models/trials');
const Challenges = require('../models/challenges');
const Actions = require('../models/actions');

module.exports.getTrials = (_req, res, next) => {

    Trials.find({})
      .then((trials) => {
        Challenges.find({})
          .then((challenges) => {
            Actions.find({})
              .then((actions) => {
                return res.send({ trials, challenges, actions })
              })
          })
      })
      .catch((err) => {
        return next(err);
      })
  }