const db = require("../db/connection")
const {selectArticleById} = require('../models/articles.model')
const {selectUserByUsername} = require('../models/users.model')


async function selectCommentsByArticleId(articleId) {
    await selectArticleById(articleId)

    // We can now get comments as articleId is valid an exists. 
    let queryStr = `SELECT com.* FROM comments com WHERE com.article_id = $1 ORDER BY com.created_at DESC;`
    const commentsResult = await db.query(queryStr, [articleId])
    
    return commentsResult.rows   
}


async function createComment(articleId, author, body) {
    await selectArticleById(articleId)

    await selectUserByUsername(author)

    // Insert as articleId must be valid. 
    let insertStr = `INSERT INTO comments(article_id, author, body) VALUES( $1, $2, $3) RETURNING *;`
    const commentResult = await db.query(insertStr, [articleId, author, body])

    return commentResult.rows[0]
}


async function deleteCommentById(id) {
    if (!Number.isInteger(id)) {
        return Promise.reject({ status: 400, msg: "Bad Request" })
    }

    let deleteStr = 'DELETE FROM comments WHERE comment_id = $1;'
    const deleteResult = await db.query(deleteStr, [id])

    if (deleteResult.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
    }

}

module.exports = {selectCommentsByArticleId, createComment, deleteCommentById}