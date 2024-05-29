const db = require("../db/connection")

async function selectUserByUsername(userName) {
    // Select the user. 
    let queryStr = `SELECT us.*
                    FROM users us 
                    WHERE us.username = $1`

    const userResult = await db.query(queryStr, [userName])

    // If none returned - 404. 
    if (userResult.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" })
    } 
    
    return userResult.rows[0]    
}


module.exports = {selectUserByUsername}