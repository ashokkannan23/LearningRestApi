var fs = require('fs');
var resolve = require('path').resolve;
const PropertyModel = require('../model/property.model');
var ImgUtils = require('../utils/image.utils');
const Error = require('../error/error');


// Get Facility

exports.listFacility = async (req, res, next) => {
    try {
        if (req.params.facilityid) {
            var facility = await PropertyModel.findOne({ _id: req.params.facilityid }).lean();
            if (!facility) throw Error.MissingItemError('Facility does not exist.');
            return res.status(200).send(facility);
        } else {
            const facilities = await PropertyModel.find()
                .select("name description phonenumber1 images")
                .sort({ createdOn: 'desc' }).lean();
            res.status(200).send(facilities);

        }
    } catch (e) {
        if (e.name == 'CastError') return next(Error.UserError('Invalid argument'));
        return next(e);
    }
}


// Create Facility
exports.createFacility = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0)
            throw Error.UserError('Request body is missing');
        if (!req.body.name)
            throw Error.UserError('Mandatory field name is missing.');
        // Create property in database
        const facilityDoc = await new PropertyModel({
            name: req.body.name,
            description: req.body.description,
            phonenumber1: req.body.phonenumber1
        }).save();
        return res.status(201).send(facilityDoc);
    } catch (e) {
        // Handle scenario when certain parameter type is incorrect.
        if (e.name == 'CastError') return next(Error.UserError('Invalid argument'));
        return next(e);
    } // catch(e)
}

// Update Facility
exports.updateFacility = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0)
            throw Error.UserError('Request body is missing');

        // If 'name' is provided, it must not be empty string.
        if (req.body.name !== undefined && !req.body.name)
            throw Error.UserError("Mandatory field name cannot be empty.");

        const facilityDoc = await PropertyModel.findOne({ _id: req.params.facilityid });
        if (!facilityDoc) throw Error.MissingItemError('Facility does not exist.');
        Object.assign(facilityDoc, req.body);
        var doc = await facilityDoc.save();
        return res.status(200).send(doc);
    }
    catch (e) {
        // Handle scenario when certain parameter type is incorrect.
        if (e.name == 'CastError') return next(Error.UserError('Invalid argument'));
        return next(e);

    }
}

// Delete Facility
exports.deleteFacility = async (req, res, next) => {
    try {
        var facility = await PropertyModel.findOne({ _id: req.params.facilityid });
        if (!facility) throw Error.MissingItemError('Facility does not exist.');

        facility = await facility.remove();
        return res.status(200).json({
            _id: facility._id,
            message: 'Deleted'
        })
    }
    catch (e) {
        // Handle scenario when certain parameter type is incorrect.
        if (e.name == 'CastError') return next(Error.UserError('Invalid argument'));
        return next(e);
    }
}


// Upload Image
// Add image to a facility
exports.uploadFacilityImage = async (req, res, next) => {
    try {
        var facilityDoc = await PropertyModel.findOne({_id: req.params.facilityid});
        if (!facilityDoc) throw Error.MissingItemError('Facility does not exist.');
        
        var img = {
            category: req.body.category,
            description: req.body.description,
            mimetype: req.file.mimetype,
            url: ImgUtils.getFacilityImageFileUrl(req.params.facilityid, req.file.filename)
        };

        facilityDoc.images.push(img);
        facilityDoc = await facilityDoc.save();
        return res.status(200).send(facilityDoc);
    } catch(e) {
        // Handle scenario when certain parameter type is incorrect.
        if (e.name == 'CastError') return next(Error.UserError('Invalid argument'));
        return next(e);
    }
} // uploadFacilityImage()


// Get facility image
exports.getFacilityImage = async (req, res, next) => {
    var filepath = ImgUtils.getFacilityImageFilePath(req.originalUrl);
    // Handle inexistent file path
    if (!filepath || !fs.existsSync(filepath))
        return next(Error.MissingItemError('File does not exist'));
    
    return res.sendFile(resolve(filepath));
}