const express = require('express')
const apiRouter = require("./routes/api-router")

const {getCommentsByArticleId, postComment, deleteComment} = require('./controllers/comments.controller.js')
const {getUsers} = require('./controllers/users.controller.js')

// Set up. 
const app = express()


// End points. 

// Api. 
app.use('/api', apiRouter)








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