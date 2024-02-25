const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}



/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try{
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification.ejs", {
      title: className + " vehicles",
      nav,
      grid,
    })
  } catch (error) {
    console.error("Error in buildByClassificationId:", error);
    // Handle the error appropriately, e.g., send an error response or redirect
    res.status(500).send("Internal Server Error");
  }
}

/* ***************************
 *  Build inventory by Details view
 * ************************** */
invCont.buildByDetailsId = async function (req, res, next) {
  try{
    const inv_id = req.params.invId
    const data = await invModel.getInventoryByDetailsId(inv_id)
    console.log(data)
    const grid = await utilities.buildDetailsGrid(data)
    // console.log("this is grid" + grid)
    let nav = await utilities.getNav()
    let name = data.inv_make + " " + data.inv_model
    res.render("./inventory/details.ejs", {
      title: name ,
      nav,
      grid,
    })
  } catch (error) {
    console.error("Error in buildByDetailsId:", error);
    // Handle the error appropriately, e.g., send an error response or redirect
    res.status(500).send("Internal Server Error");
  }
}


module.exports = invCont