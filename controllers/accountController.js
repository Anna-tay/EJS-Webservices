// require statements
const utilities = require("../utilities/index")
const bcrypt = require('bcryptjs');
const accountModel = require('../models/account-model')


/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav();
  const { account_firstname, account_lastname, account_email, account_password } = req.body;

  // Hash the password before storing
  let hashedPassword;
  try {
    // Hash the password using bcrypt
    hashedPassword = await bcrypt.hash(account_password, 10);
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.');
    res.status(500).render("account/registration", {
      title: "Registration",
      nav,
      errors: null,
    });
    return; // Return to avoid executing the rest of the function in case of an error
  }

  // Call registerAccount with the hashed password
  const regResult = await accountModel.registerAccountSQL(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword  // Use the hashed password
  );

  if (regResult) {
    req.flash("notice", `Congratulations, you're registered ${account_firstname}. Please log in.`);
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("account/registration", {
      title: "Registration",
      nav,
    });
  }
}



/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
    })
  }

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/registration", {
    title: "Register",
    nav,
    errors: null,
  })
}

module.exports = { buildLogin, buildRegister, registerAccount }
