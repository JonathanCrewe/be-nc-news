const {fetchAllTopics} = require('../models/topics.model')

async function getTopics(req, res, next) {
    try {
        const topicArray = await fetchAllTopics()
        res.status(200).send({topics: topicArray})
    }
    catch(err) {
        next(err)
    }
}


module.exports = {getTopics}