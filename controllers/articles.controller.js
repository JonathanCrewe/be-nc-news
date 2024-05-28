const {selectArticleById} = require('../models/articles.model')

async function getArticleById(req, res, next) {
    try {
        const articleId = parseInt(req.params.article_id)
        const returnedArticle = await selectArticleById(articleId)
        res.status(200).send({article: returnedArticle})
    }
    catch(err) {
        next(err)
    }
}


module.exports = {getArticleById}