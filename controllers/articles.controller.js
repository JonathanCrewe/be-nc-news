const {selectArticleById, fetchAllArticles, updateArticle} = require('../models/articles.model')
const {selectCommentsByArticleId, createComment} = require('../models/comments.model')


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
        const {topic, sort_by, order} = req.query
        const articleArray = await fetchAllArticles(topic, sort_by, order)
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

async function getCommentsByArticleId(req, res, next) {
    try {
        const articleId = parseInt(req.params.article_id)
        
        const commentsArray = await selectCommentsByArticleId(articleId)
        res.status(200).send({comments: commentsArray})
    }
    catch(err) {
        next(err)
    }
}


async function postComment(req, res, next) {
    try {
        const articleId = parseInt(req.params.article_id)

        const newCommentObj = req.body
        const author = newCommentObj.username
        const commentBody = newCommentObj.body

        const newComment = await createComment(articleId, author, commentBody)
        res.status(200).send({comment: newComment})
    }
    catch(err) {
        next(err)
    }
}


module.exports = {getArticleById, getArticles, patchArticle, getCommentsByArticleId, postComment}