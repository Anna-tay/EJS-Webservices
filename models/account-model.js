const pool = require("../database/")

/* *****************************
*   Register new account
* *************************** */
async function registerAccountSQL(account_firstname, account_lastname, account_email, account_password){
    try {
      const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'client') RETURNING *"
      return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
    } catch (error) {
      return error.message
    }
  }

/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email){
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1"
    const email = await pool.query(sql, [account_email])
    return email.rowCount
  } catch (error) {
    return error.message
  }
}

/* *****************************
* Return account data using email address
* ***************************** */
async function getAccountByEmail(account_email) {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email])
    // console.log('this is result with no []'+ result)
    // console.log(result.rows[0])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}

async function updateAccountSQL(account_firstname, account_lastname, account_email, account_id){
  try {
    const sql = `UPDATE account SET account_firstname = $1, account_lastname = $2, account_email = $3 WHERE account_id = $4 RETURNING *`
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_id])
  } catch (error) {
    return error.message
  }
}

async function updatePasswordSQL(hashed_password){
  try {
    const sql = `UPDATE account SET account_password = $1 WHERE account_id = $2 RETURNING *`
    return await pool.query(sql, [hashed_password, account_id])
  } catch (error) {
    return error.message
  }
}

module.exports = {updateAccountSQL, updatePasswordSQL, registerAccountSQL, checkExistingEmail, getAccountByEmail}