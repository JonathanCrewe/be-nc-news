const express = require('express')
const {getTopics} = require('./controllers/topics.controller.js')
const {getEndpoints} = require('./controllers/endpoints.controller.js')


// Set up. 
const app = express()
app.use(express.json())

// End points. 
app.get('/api/topics', getTopics)

app.get('/api/', getEndpoints)


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