const activitiesRouter = require('express').Router();

const { getData, purchaseActivity, endDay, upgradeActivity, purchaseZone, restartMap } = require('../controllers/activities');

activitiesRouter.get('/', getData);

activitiesRouter.post('/', endDay);

activitiesRouter.post('/purchase/:activityId', purchaseActivity);

activitiesRouter.put('/upgrade/:activityId', upgradeActivity);

activitiesRouter.put('/zones/:zoneId', purchaseZone);

activitiesRouter.delete('/restart', restartMap);

module.exports = activitiesRouter;