// Needed Resources
const express = require("express");
const router = new express.Router() ;
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController");
const regValidate = require('../utilities/account-validation')



// Route to build inventory by classification view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

router.get("/registration", accountController.buildRegister)

// show they logged in
router.get("/", utilities.handleErrors(accountController.buildShowLogin))


// Process the registration data
router.post(
    "/registration",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
  "/login",
  utilities.handleErrors(accountController.accountLogin)
)
// router.post(
//   "/login",
//   regValidate.loginRules(),
//   regValidate.checkLoginData,
//   utilities.handleErrors(accountController.accountLogin)
// )

module.exports = router;