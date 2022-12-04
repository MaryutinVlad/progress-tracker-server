const activitiesRouter = require('express').Router();

const { getData, purchaseActivity, endDay, upgradeActivity, purchaseZone, restartMap } = require('../controllers/activities');

activitiesRouter.get('/activities', getData);

activitiesRouter.post('/activities', endDay);

activitiesRouter.post('/activities/:activityId', purchaseActivity);

activitiesRouter.put('/activities/:activityId', upgradeActivity);

activitiesRouter.put('/activities/zones/:zoneId', purchaseZone);

activitiesRouter.delete('/restart', restartMap);

module.exports = activitiesRouter;