const db = require("../db/connection")


async function selectArticleById(id) {
    // Check the id is a valid type. 
    if (!Number.isInteger(id)) {
        return Promise.reject({ status: 400, msg: "Bad Request" })
    }

    // Select the article. 
    let queryStr = `SELECT art.*
                    FROM articles art 
                    WHERE art.article_id = $1`

    const articleResult = await db.query(queryStr, [id])

    // If none returned - 404. 
    if (articleResult.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" })
    } 
    
    return articleResult.rows[0]    
}


module.exports = {selectArticleById}