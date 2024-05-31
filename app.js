const express = require('express')
const apiRouter = require("./routes/api-router")

const {getCommentsByArticleId, postComment, deleteComment} = require('./controllers/comments.controller.js')
const {getUsers} = require('./controllers/users.controller.js')


const app = express()
app.use('/api', apiRouter)


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