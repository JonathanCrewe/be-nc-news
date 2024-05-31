const express = require('express')
const {getArticleById, getArticles, patchArticle} = require('./controllers/articles.controller.js')
const {getCommentsByArticleId, postComment, deleteComment} = require('./controllers/comments.controller.js')
const {getUsers} = require('./controllers/users.controller.js')
const apiRouter = require("./routes/api-router");

// Set up. 
const app = express()


// End points. 

// Api. 
app.use('/api', apiRouter)





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