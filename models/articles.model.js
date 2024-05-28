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


async function fetchAllArticles() {
    let queryStr = `SELECT  art.article_id, 
                            art.title, 
                            art.topic, 
                            art.author, 
                            art.created_at, 
                            art.votes, 
                            art.article_img_url, 
                            COUNT(com.comment_id) AS comment_count
                    FROM articles art 
                    LEFT JOIN comments com ON art.article_id = com.article_id
                    GROUP BY    art.article_id, art.title, art.topic, art.author, 
                                art.created_at, art.votes, art.article_img_url
                    ORDER BY art.created_at DESC;`

    const allTopicsResult = await db.query(queryStr)

    return allTopicsResult.rows
}


module.exports = {selectArticleById, fetchAllArticles}