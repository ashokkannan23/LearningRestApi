const express = require('express');
const router = express.Router();
const propertyCtrl = require('../controller/facility.controller');
const ImgCtrl = require('../utils/image.utils');
const Error = require('../error/error');

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


// Add image to a facility
// Message body is as follows:
//  file: <image-file>
//  category: image-category-name
//  description: image-description
router.post('/image/:facilityid', ImgCtrl.Upload.single('file'), (req, res, next) => {
    if (!req.file) return next(Error.ServerError('Error creating file'));
    return propertyCtrl.uploadFacilityImage(req, res, next);
});


// Get facility image file
router.get('/image/:filename', (req, res, next) => {
    return propertyCtrl.getFacilityImage(req, res, next); 
});

// Delete an image associated with a facility
// Must specify the image id in the URL path.
router.delete('/image/:facilityid/:imageid', (req, res, next) => {
    return propertyCtrl.deleteFacilityImage(req, res, next);
});

module.exports = router;