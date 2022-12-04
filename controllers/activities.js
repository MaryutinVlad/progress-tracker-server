const Activities = require('../models/activities');
const Zones = require('../models/zones');
const User = require('../models/users');
const Trials = require('../models/trials');

module.exports.getData = (_req, res, next) => {

  Activities.find({})
    .then((activities) => {
      Zones.find({})
        .then((zones) => {
          return res.send({
            activities,
            zones
          })
        })
        .catch((err) => {
          return next(err);
        })
    })
    .catch((err) => {
      return next(err);
    })
}

module.exports.purchaseActivity = (req, res, next) => {
  const { slots } = req.body;

  Activities.findByIdAndUpdate(req.params.activityId, {
    bought: true
  }, { new: true })
    .then((boughtActivity) => {
      User.findByIdAndUpdate(req.user._id, {
        slots: slots - 1
      }, { new: true })
        .then((updatedUser) => {
          return res.send({ boughtActivity, updatedUser });
        })
        .catch(() => {
          return next('Error while updating user info during activity purchase');
        })
    })
    .catch(() => {
      return next('Error while updating activity info on its purchase');
    })
}

module.exports.purchaseZone = (req, res, next) => {
  const currentWp = req.body.wp;

  Zones.findByIdAndUpdate(req.params.zoneId, {
    bought: true
  }, { new: true })
    .then((purchasedZone) => {
      const wpAfterPurchase = currentWp - purchasedZone.cost;

      User.findByIdAndUpdate(req.user._id, {
        wp: wpAfterPurchase,
        slots: 2
      }, { new: true })
        .then((updatedUser) => {
          return res.send({ purchasedZone, updatedUser });
        })
        .catch((err) => {
          return next(err);
        })
    })
    .catch((err) => {
      return next(err);
    })
}

module.exports.upgradeActivity = (req, res, next) => {
  const  { rank, wp }  = req.body;

  Activities.findByIdAndUpdate(req.params.activityId, {
    rank: rank
  }, { new: true })
    .then((upgradedActivity) => {
      User.findByIdAndUpdate(req.user._id, {
        wp: wp
      }, { new: true })
        .then((updatedUser) => {
          return res.send({ upgradedActivity, updatedUser});
        })
    })
    .catch((err) => {
      return next(err);
    })
}

module.exports.endDay = (req, res, next) => {

  let { values, userData, wpToEarn, nextLevelAt } = req.body;
  const keys = Object.keys(values);
  const updatedActivities = [];

  function updateProgress() {
    for (let key of keys) {
      const { totalValue } = values[key];

      Activities.findOneAndUpdate(
        { name: key },
        { completed: totalValue },
        { new: true }
      )
      .then((result) => {
        updatedActivities.push(result);
        if (updatedActivities.length === (Object.keys(values)).length) {
          if ((userData.xp + wpToEarn) >= nextLevelAt) {
            userData.level += 1;
          }
          User.findByIdAndUpdate(req.user._id, {
            wp: wpToEarn + userData.wp,
            xp: wpToEarn + userData.xp,
            daysPassed: userData.daysPassed + 1,
            level: userData.level
          }, { new: true })
            .then((user) => {
              return res.send({ user, updatedActivities });
            }
          )
        }
      })
      .catch((err) => {
        return next(err);
      })
    }
  }

  updateProgress();
}

module.exports.restartMap = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {
    wp: 20,
    slots: 0
  }, { new: true })
    .then((updatedUser) => {
      Activities.updateMany({ bought: true }, { bought: false, completed: 0, rank: 1 }, { new: true })
        .then((restartedActivities) => {
          Zones.updateMany({ bought: true }, { bought: false }, { new: true })
            .then((refreshedZones) => {
              Trials.updateMany({ unlocked: true }, { unlocked: false }, { new: true })
                .then((restartedTrials) => {
                  return res.send({
                    user: updatedUser,
                    activities: restartedActivities,
                    zones: refreshedZones,
                    trials: restartedTrials
                  });
                })
            })
        })
        .catch((err) => {
          return next(err);
        })
    })
    .catch((err) => {
      return next(err);
    })
}