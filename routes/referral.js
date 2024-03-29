// Needed Resources
const express = require("express");
const router = new express.Router() ;
const utilities = require("../utilities/index")
const referralController = require("../controllers/referralController");
const regValidate = require('../utilities/referral-validation')

//  final project add on
// adding a reference/contact
router.get("/addContact/:account_id", utilities.checkLoginned, utilities.handleErrors(referralController.buildAddContact))

router.post("/addContact/:account_id",
  utilities.checkLoginned,
  regValidate.addContactRules(),
  regValidate.checkContactData,
  utilities.handleErrors(referralController.addContact))


module.exports = router;
