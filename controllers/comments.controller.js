const {selectCommentsByArticleId} = require('../models/comments.model')


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


module.exports = {getCommentsByArticleId}