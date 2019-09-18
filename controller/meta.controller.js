var MetaModel = require('../model/meta.model');
var Error = require('../error/error');

exports.getBuildingTypes = function(req, res) {
    return res.status(200).json(MetaModel.buildingTypes);
}