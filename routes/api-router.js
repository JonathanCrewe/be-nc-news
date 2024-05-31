const express = require('express')
const apiRouter = require('express').Router()

const {getEndpoints} = require('../controllers/endpoints.controller')

const topicsRouter = require('./topics-router')
const articlesRouter = require('./articles-router')
const commentsRouter = require('./comments-router')
const usersRouter = require('./users-router')

apiRouter.use(express.json())

// Get endpoints. 
apiRouter.get('/', getEndpoints)

// Endpoints. 
apiRouter.use('/topics', topicsRouter)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/users', usersRouter)
  

module.exports = apiRouter;