const {selectCommentsByArticleId, createComment, deleteCommentById} = require('../models/comments.model')


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

async function deleteComment(req, res, next) {
    try{
        const commentId = parseInt(req.params.comment_id)

        await deleteCommentById(commentId)

        res.status(204).send()
    }
    catch(err) {
        next(err)
    }
}


module.exports = {getCommentsByArticleId, postComment, deleteComment}