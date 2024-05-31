const {deleteCommentById} = require('../models/comments.model')


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


module.exports = {deleteComment}