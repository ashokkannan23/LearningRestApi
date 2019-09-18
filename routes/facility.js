const express = require('express');
const router = express.Router();
const propertyCtrl = require('../controller/facility.controller');

// Get All Facilites
router.get('/', (req, res, next) => {
    return propertyCtrl.listFacility(req, res, next);
});

// Create new facility
router.post('/', (req, res, next) => {
    return propertyCtrl.createFacility(req, res, next);
});

// Get a facility by facility id
router.get('/:facilityid', (req, res, next) => {
    return propertyCtrl.listFacility(req, res, next);
});

// Update facility by facility id
router.put('/:facilityid', (req, res, next) => {
   return propertyCtrl.updateFacility(req, res, next); 
});


// Delete a facility 
router.delete('/:facilityid', (req, res, next) => {
   return propertyCtrl.deleteFacility(req, res, next);
});

module.exports = router;