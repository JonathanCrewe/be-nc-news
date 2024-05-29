const db = require("../db/connection")


async function selectCommentsByArticleId(articleId) {
    // Check the articleId is a valid type. 
    if (!Number.isInteger(articleId)) {
        return Promise.reject({ status: 400, msg: "Bad Request" })
    }

    // Check the articleId exists in DB. 
    const articleQueryStr = `SELECT 1 FROM articles art WHERE art.article_id = $1;`
    const articleResult = await db.query(articleQueryStr, [articleId]) 

    if (articleResult.rows.length !==1) {
        return Promise.reject({ status: 404, msg: "Not Found" })
    }

    // We can now get comments as articleId is valid an exists. 
    let queryStr = `SELECT com.* FROM comments com WHERE com.article_id = $1 ORDER BY com.created_at DESC;`
    const commentsResult = await db.query(queryStr, [articleId])
    
    return commentsResult.rows   
}


module.exports = {selectCommentsByArticleId}