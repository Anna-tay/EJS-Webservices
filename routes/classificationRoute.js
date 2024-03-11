// Needed Resources
const express = require("express");
const router = new express.Router() ;
const utilities = require("../utilities/index")
const classifictionController = require("../controllers/classificationController");
const regValidate = require('../utilities/account-validation')

// new classification
router.get("/new", classifictionController.buildNewClass)
// manager route
router.get("/", classifictionController.buildManager)
// add-inv route
router.get("/new_inv", classifictionController.buildNewInv)

// Process the new inv data
router.post(
    "/new_inv",
    regValidate.newInvRules(),
    regValidate.checkNewInvData,
    utilities.handleErrors(classifictionController.registerNewInv)
)
// Process the new classification data
router.post(
    "/new",
    regValidate.newClassRules(),
    regValidate.checkNewClassData,
    utilities.handleErrors(classifictionController.registerClassification)
)


module.exports = router;