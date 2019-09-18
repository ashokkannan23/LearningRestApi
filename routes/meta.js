let express = require('express');
let metaCtrl = require('../controller/meta.controller');

let router = express.Router();

router.get('/buildingtypes', (req, res, next) =>{
    return metaCtrl.getBuildingTypes(req, res, next); 
})

module.exports = router;