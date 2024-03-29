const pool = require("../database/")


/* *****************************
*   Adding new contact
* *************************** */
async function addContactSQL(contact_firstname, contact_lastname, contact_email, contact_phone, contact_relationship, contact_info, account_id ){
    try {
      const sql = "INSERT INTO contacts (contact_firstname, contact_lastname, contact_email, contact_phone, contact_relationship, contact_info, contacted, account_id ) VALUES ($1, $2, $3, $4, $5, $6, 1, $7) RETURNING *"
      return await pool.query(sql, [contact_firstname, contact_lastname, contact_email, contact_phone, contact_relationship, contact_info, account_id ])
    } catch (error) {
      return error.message
    }
  }
  
  async function getDiscount(account_id){
    try {
      const sql = "select COUNT(account_id) from contacts where account_id = $1"
      data = await pool.query(sql, [account_id])
      let discount
      if (data.rows[0].count < 41){
        discount = data.rows[0].count * 50
      }else{
        discount = 2000
      }
      return discount
    } catch (error) {
      return error.message
    }
  }
  
  /* **********************
   *   Check for existing email for contacts
   * ********************* */
  async function checkExistingEmailContacts(contact_email){
    try {
      const sql = "SELECT * FROM contacts WHERE contact_email = $1"
      const email = await pool.query(sql, [contact_email])
      return email.rowCount
    } catch (error) {
      return error.message
    }
  }
  
  async function getEmail(account_id) {
    console.log(account_id)
    try {
      const result = await pool.query(
        'SELECT account_email FROM account WHERE account_id = $1',
        [account_id])

      return result.rows[0].account_email
    } catch (error) {
      return new Error("No matching email found")
    }
  }
  
  async function updateContactContacted(contact_id) {
    console.log('it went in ==========================' + contact_id)

    try {
      const result = await pool.query(
        `UPDATE contacts SET contacted = 0 WHERE contact_id = ${contact_id}`)
      return result.rows[0]
    } catch (error) {
      return new Error("No matching contact was found")
    }
  }
  
  async function getAllContacts() {
    try {
      const result = await pool.query(
        `SELECT c.contact_firstname,
        c.contact_lastname,
         c.contact_email,
         c.contact_phone,
         c.contact_relationship, c.contact_info, c.contacted, a.account_firstname, a.account_lastname, c.contact_id
        FROM public.contacts AS c
        JOIN public.account AS a ON c.account_id = a.account_id;
        `)

      return result
    } catch (error) {
      return new Error("No contacts found")
    }
  }
  
  module.exports = {getDiscount, updateContactContacted, getAllContacts, getEmail, checkExistingEmailContacts, addContactSQL}