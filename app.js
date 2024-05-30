const express = require('express')
const {getTopics} = require('./controllers/topics.controller.js')
const {getEndpoints} = require('./controllers/endpoints.controller.js')
const {getArticleById, getArticles, patchArticle} = require('./controllers/articles.controller.js')
const {getCommentsByArticleId, postComment, deleteComment} = require('./controllers/comments.controller.js')
const {getUsers} = require('./controllers/users.controller.js')


// Set up. 
const app = express()
app.use(express.json())


// End points. 

// Api. 
app.get('/api/', getEndpoints)


// Topics. 
app.get('/api/topics', getTopics)


// Articles. 
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles/:article_id/comments', getCommentsByArticleId) 

app.post('/api/articles/:article_id/comments', postComment) 

app.patch('/api/articles/:article_id', patchArticle)


// Comments.
app.delete('/api/comments/:comment_id', deleteComment)


// Users. 
app.get('/api/users', getUsers)


// Error handlers. 
app.use((req, res)=>{
    res.status(404).send({msg: 'Not Found'})
})

app.use((err, req, res, next)=>{
    if (err.status && err.msg) {
        res.status(err.status).send({msg: err.msg})
    } else next(err)
})

module.exports = app