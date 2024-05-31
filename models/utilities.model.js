const db = require("../db/connection")


async function getValidColumnNames(tableName) {
    // ToDo - Potentially validate the table name against a system table?
    const columnResult = await db.query(`SELECT column_name FROM information_schema.columns WHERE table_name = $1;`, [tableName])
    const validColumnNames = columnResult.rows.map( (columnNameObj) => columnNameObj.column_name)

    return Object.values(validColumnNames)
}

async function isValidColumnOnTable(columnName, tableName) {
    const validColumnNames = await getValidColumnNames(tableName)
  
    let isValid = false

    if (validColumnNames.includes(columnName.toLowerCase())) {
        isValid = true
    }

    return isValid


    // const validColumnNames = await getValidColumnNames('articles')

    // if (!validColumnNames.includes(orderByColumn.toLowerCase())) {
    //     return Promise.reject({ status: 400, msg: "Bad Request" })
    // }
}


module.exports = {getValidColumnNames, isValidColumnOnTable}