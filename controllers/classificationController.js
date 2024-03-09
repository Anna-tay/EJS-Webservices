// require statements
const utilities = require("../utilities/index")
const classification_model = require('../models/classification-model')


/* ****************************************
*  Process new classification
* *************************************** */
async function registerClassification(req, res) {
  let nav = await utilities.getNav();
  const { classification_name } = req.body;

  // Call registerAccount with the hashed password
  const regResult = await classification_model.classificationAccountSQL(
    classification_name
  );

  if (regResult) {
    req.flash("notice", `Congratulations, the new Classification ${classification_name} got added`);
    res.status(201).render("inventory/add-classification", {
      title: "New Class",
      nav,
    });
  } else {
    req.flash("notice", "Sorry, the new class failed.");
    res.status(501).render("inventory/add-classification", {
      title: "New Class",
      nav,
    });
  }
}

/* ****************************************
*  Process new inventory
* *************************************** */
async function registerNewInv(req, res) {
  let nav = await utilities.getNav();
  const { inv_make, inv_model,
    inv_year, inv_description,
     inv_image, inv_thumbnail,
      inv_miles, inv_color, classification_id } = req.body;

  console.log(inv_make, inv_model,
    inv_year, inv_description,
     inv_image, inv_thumbnail, inv_price,
      inv_miles, inv_color, classification_id)
  // Call invAccountSQL
  const regResult = await classification_model.invAccountSQL(
    inv_make, inv_model,
    inv_year, inv_description,
     inv_image, inv_thumbnail, inv_price,
      inv_miles, inv_color, classification_id
  );

  if (regResult) {
    req.flash("notice", `Congratulations, the new inv got added: ${inv_make} ${inv_model}.`);
    res.status(201).render("inventory/add-inventory", {
      title: "New Inventory",
      nav,
    });
  } else {
    req.flash("notice", "Sorry, the new inv failed.");
    res.status(501).render("inventory/add-inventory", {
      title: "New Inventory",
      nav,
    });
  }
}


async function buildManager(req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/managment", {
    title: "Manager",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Deliver add classification view
* *************************************** */
async function buildNewClass(req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "New classification",
    nav,
    errors: null,
  })
}


/* ****************************************
*  Deliver add inv view
* *************************************** */
async function buildNewInv(req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-inventory", {
    title: "New Inventory",
    nav,
    errors: null,
  })
}

module.exports = { buildNewClass, registerClassification, buildManager, buildNewInv, registerNewInv }
