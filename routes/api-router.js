const express = require('express')
const apiRouter = require('express').Router()
const {getEndpoints} = require('../controllers/endpoints.controller')
const topicsRouter = require('./topics-router')
const articlesRouter = require('./articles-router');

apiRouter.use(express.json())

// Get endpoints. 
apiRouter.get('/', getEndpoints)

// Endpoints. 
apiRouter.use('/topics', topicsRouter)
apiRouter.use('/articles', articlesRouter)
  

module.exports = apiRouter;