const articlesRouter = require('express').Router()
const {getArticleById, getArticles, patchArticle} = require('../controllers/articles.controller')
const {getCommentsByArticleId, postComment} = require('../controllers/comments.controller')


// Get. 
articlesRouter.route('/').get(getArticles)

articlesRouter.route('/:article_id')
    .get(getArticleById)
    .patch(patchArticle)

articlesRouter.route('/:article_id/comments')
    .get(getCommentsByArticleId)
    .post(postComment) 


module.exports = articlesRouter;