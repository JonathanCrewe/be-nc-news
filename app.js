const express = require('express')
const {getTopics} = require('./controllers/topics.controller.js')
const {getEndpoints} = require('./controllers/endpoints.controller.js')
const {getArticleById, getArticles} = require('./controllers/articles.controller.js')
const {getCommentsByArticleId} = require('./controllers/comments.controller.js')


// Set up. 
const app = express()
//app.use(express.json())

// End points. 
app.get('/api/', getEndpoints)
app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles/:article_id/comments', getCommentsByArticleId) 


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