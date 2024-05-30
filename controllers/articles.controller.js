const {selectArticleById, fetchAllArticles, updateArticle} = require('../models/articles.model')

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

async function getArticles(req, res, next) {
    try {
        const {topic} = req.query
        const articleArray = await fetchAllArticles(topic)
        res.status(200).send({articles: articleArray})
    }
    catch(err) {
        next(err)
    }
}

async function patchArticle(req, res, next) {
    try {
        const id = parseInt(req.params.article_id)
        const incrementAmount = parseInt(req.body.inc_votes)

        const updatedArticle = await updateArticle(id, incrementAmount)
        res.status(200).send({article: updatedArticle})
    }
    catch(err) {
        next(err)
    }
}


module.exports = {getArticleById, getArticles, patchArticle}