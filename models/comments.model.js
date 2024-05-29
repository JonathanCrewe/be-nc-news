const db = require("../db/connection")
const {selectArticleById} = require('../models/articles.model')


async function selectCommentsByArticleId(articleId) {
    await selectArticleById(articleId)

    // We can now get comments as articleId is valid an exists. 
    let queryStr = `SELECT com.* FROM comments com WHERE com.article_id = $1 ORDER BY com.created_at DESC;`
    const commentsResult = await db.query(queryStr, [articleId])
    
    return commentsResult.rows   
}

async function createComment(articleId, author, body) {
    await selectArticleById(articleId)

    // Insert as articleId must be valid. 
    let insertStr = `INSERT INTO comments(article_id, author, body) VALUES( $1, $2, $3) RETURNING *;`
    const commentResult = await db.query(insertStr, [articleId, author, body])

    return commentResult.rows[0]
}


module.exports = {selectCommentsByArticleId, createComment}