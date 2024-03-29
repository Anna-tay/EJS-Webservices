const utilities = require("../utilities/index")
const bcrypt = require('bcryptjs');
const referralModel = require('../models/referral-model')
const jwt = require("jsonwebtoken")
require("dotenv").config()

// final project add new contact
/* ****************************************
*  Deliver buildAddContact view
* *************************************** */
async function buildAddContact(req, res, next) {
    const account_id = req.params.account_id
    let discount = await referralModel.getDiscount(account_id)
    let loginLogout = await utilities.getLoginLogout()
    let account_email = await referralModel.getEmail(account_id)
    let nav = await utilities.getNav()
    res.render("referal/addContact", {
      title: "Please add a new Reference!",
      nav,
      loginLogout,
      errors: null,
      account_id,
      account_email,
      discount
    })
  }
  
  async function addContact(req, res, next) {
    let nav = await utilities.getNav()
    let loginLogout = await utilities.getLoginLogout();
    const { contact_firstname, contact_lastname, contact_email, contact_phone, contact_relationship, contact_info, account_id } = req.body;
  
    // Call registerAccount with the hashed password
    const regResult = await referralModel.addContactSQL(
      contact_firstname, contact_lastname, contact_email, contact_phone, contact_relationship, contact_info, account_id
      );
      console.log(regResult)
      let discount = await referralModel.getDiscount(account_id)
      let account_email = await referralModel.getEmail(account_id)
      if (regResult) {
      let nav = await utilities.getNav()
      res.render("referal/addContact", {
        title: "A reference was created! Want to add another?",
        nav,
        loginLogout,
        errors: null,
        account_id,
        discount,account_email
      })
    } else {
      let nav = await utilities.getNav()
      res.render("referal/addContact", {
        title: "Sorry something went wrong please try again later.",
        nav,
        loginLogout,
        errors: null,
        account_id,
        discount,account_email
      })
    }
  }
  
async function contactUpdate(req, res, next) {
    let nav = await utilities.getNav()
    let loginLogout = await utilities.getLoginLogout();
    const account_email = req.params.account_email
    const { contact_id } = req.body;
 
    const regResult = await referralModel.updateContactContacted(
      contact_id
      );


      if (regResult) {
        let nav = await utilities.getNav()
        let loginLogout = await utilities.getLoginLogout()
        let account_info = await utilities.getAccountType(account_email)
        let accountType = account_info.account_type
        let account_name = account_info.account_firstname + ' ' + account_info.account_lastname
        let account_id = account_info.account_id;
        let contactTable = await utilities.buildContactTable()
        let addContact = "/account/addContact/"+ account_id
        let updateAccountLink = "/account/update-info/" + account_id
        res.render("account/showLogin", {
          title: "That contact has been updated",
          nav,
          loginLogout,
          errors: null,
          accountType,
          account_name,
          account_id,
          contactTable,
          addContact,
          updateAccountLink
        })
    } else {
      let nav = await utilities.getNav()
        let loginLogout = await utilities.getLoginLogout()
        let account_info = await utilities.getAccountType(account_email)
        let accountType = account_info.account_type
        let account_name = account_info.account_firstname + ' ' + account_info.account_lastname
        let account_id = account_info.account_id;
        let contactTable = await utilities.buildContactTable()
        let addContact = "/account/addContact/"+ account_id
        let updateAccountLink = "/account/update-info/" + account_id
        res.render("account/showLogin", {
          title: "Congrats you are logged in",
          nav,
          loginLogout,
          errors: null,
          accountType,
          account_name,
          account_id,
          contactTable,
          addContact,
          updateAccountLink
        })
    }
  }
  

  module.exports = { addContact, buildAddContact, contactUpdate}
  