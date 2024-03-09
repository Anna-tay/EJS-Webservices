const pool = require("../database/")

/* *****************************
*   Register new classification
* *************************** */
async function classificationAccountSQL(new_classification){
    try {
      // console.log(new_classification)
      const sql = `INSERT INTO classification (classification_name) VALUES ($1) RETURNING *`

      return await pool.query(sql, [new_classification])
    } catch (error) {
      return error.message
    }
}

/* *****************************
*   Register new inventory
* *************************** */
async function invAccountSQL(inv_make, inv_model,
  inv_year, inv_description,
   inv_image, inv_thumbnail,
    inv_miles, inv_color, classification_id){
  try {
    const sql = "INSERT INTO inventory (inv_make, inv_model,inv_year, inv_description,inv_image, inv_thumbnail,inv_miles, inv_color, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *"
    return await pool.query(sql, [inv_make, inv_model,
      inv_year, inv_description,
       inv_image, inv_thumbnail,
        inv_miles, inv_color, classification_id])
  } catch (error) {
    return error.message
  }
}

// /* **********************
//  *   Check for existing email
//  * ********************* */
// async function checkExistingEmail(account_email){
//   try {
//     const sql = "SELECT * FROM account WHERE account_email = $1"
//     const email = await pool.query(sql, [account_email])
//     return email.rowCount
//   } catch (error) {
//     return error.message
//   }
// }

module.exports = {classificationAccountSQL, invAccountSQL}