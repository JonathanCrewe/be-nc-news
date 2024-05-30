const db = require("../db/connection")
const {fetchAllTopics} = require('./topics.model')

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


async function fetchAllArticles(topic) {
    // Setup. 
    let queryStr = `SELECT  art.article_id, 
                            art.title, 
                            art.topic, 
                            art.author, 
                            art.created_at, 
                            art.votes, 
                            art.article_img_url, 
                            COUNT(com.comment_id) AS comment_count
                    FROM articles art 
                    LEFT JOIN comments com ON art.article_id = com.article_id `

    const groupOrderStr =  `GROUP BY art.article_id, art.title, art.topic, art.author, 
                                    art.created_at, art.votes, art.article_img_url
                            ORDER BY art.created_at DESC;`

    const queryParamArray = []

    // Add WHERE claues for topic if required. 
    if (topic) {
        const validTopics = await fetchAllTopics()
        const validTopicValues = validTopics.map( (topic) => topic.slug)

        if (!validTopicValues.includes(topic)) {
            return Promise.reject( {status: 404, msg: "Not Found"} )
        } else {
            queryParamArray.push(topic)
            queryStr = queryStr + `WHERE topic = $1`
        }
    }

    // Add GROUP BY and ORDER By clauses. 
    queryStr = queryStr + groupOrderStr

    // Finally run the query. 
    const allTopicsResult = await db.query(queryStr, queryParamArray)

    return allTopicsResult.rows
}

 async function updateArticle(id, incrementAmount) {
    // Check the params are integers. 
    if (!Number.isInteger(id) || !Number.isInteger(incrementAmount)) {
        return Promise.reject({ status: 400, msg: "Bad Request" })
    }

    //Update the article. 
    let updateStr = `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`

    const result = await db.query(updateStr, [incrementAmount, id])

    return result.rows[0]
 }


module.exports = {selectArticleById, fetchAllArticles, updateArticle}