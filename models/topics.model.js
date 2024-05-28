const db = require("../db/connection")

async function fetchAllTopics() {
    let queryStr = `SELECT *
                    FROM topics `

    const allTopicsResult = await db.query(queryStr)

    return allTopicsResult.rows
}

module.exports = {fetchAllTopics}