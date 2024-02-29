// Needed Resources
const express = require("express");
const router = new express.Router() ;
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController");
const regValidate = require('../utilities/account-validation')



// Route to build inventory by classification view
router.get("/account", accountController.buildLogin);

router.get("/registration", accountController.buildRegister)

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

module.exports = router;