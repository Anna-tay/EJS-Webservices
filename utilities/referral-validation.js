const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const referralModel = require("../models/referral-model")


/*  **********************************
 *  reference Data Validation Rules
 * ********************************* */
validate.addContactRules = () => {
    return [
      // firstname is required and must be string
      body("contact_firstname")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a first name."), // on error this message is sent.
  
      // lastname is required and must be string
      body("contact_lastname")
        .trim()
        .isLength({ min: 2 })
        .withMessage("Please provide a last name."), // on error this message is sent.
  
      // valid email is required and cannot already exist in the DB
      body("contact_email")
      .trim()
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage("A valid email is required.")
      .custom(async (contact_email) => {
        const emailExists = await accountModel.checkExistingEmailContacts(account_email)
        if (emailExists){
          throw new Error("Email exists. Please log in or use different email")
        }
      }),
  
      body("contact_phone")
        .trim()
        .isLength({ min: 7 })
        .isFloat()
        .withMessage("Please provide a phone number."), // on error this message is sent.
  
    ]
  }
  
  /* ******************************
  * Check data and return errors or continue to add new reference
  * ***************************** */
  validate.checkContactData = async (req, res, next) => {
    const { contact_firstname, contact_lastname, contact_email, contact_phone, contact_relationship, contact_info, account_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      let loginLogout = await utilities.getLoginLogout()
      res.render("account/addContact", {
        errors,
        title: "Sorry something went wrong. Please try again later!",
        nav,
        loginLogout,
  
        account_id,
      })
      return
    }
    next()
  }

  module.exports = validate