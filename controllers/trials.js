const User = require('../models/users');
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

module.exports.unlockTrial = (req, res, next) => {

  Trials.findByIdAndUpdate(
      req.params.id,
      { unlocked: true },
      { new: true }
    )
    .then(updatedTrial => {
      User.findByIdAndUpdate(
        req.user._id,
        { wp: req.body.wp },
        { new: true }
      )
      .then(updatedUser => {
        return res.send({ updatedTrial, updatedUser });
      })  
    })
    .catch(err => {
      return next(err);
    })
}

module.exports.completeTrial = (req, res, next) => {
  const { wp, nextReward, nextCompleted, xp } = req.body;

  Trials.findByIdAndUpdate(
    req.params.id,
    {
      incReward: nextReward,
      completed: nextCompleted
    },
    { new: true }
    )
    .then(updatedTrial => {
      User.findByIdAndUpdate(
        req.user._id,
        {
          wp,
          xp: xp + nextReward
        },
        { new: true }
      )
      .then(updatedUser => {
        return res.send({ updatedTrial, updatedUser });
      })
    })
    .catch(err => {
      return next(err);
    })
}