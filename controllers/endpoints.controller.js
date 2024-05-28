const endpointsJSON = require('../endpoints.json')

function getEndpoints(req, res, next) {
    res.status(200).send(endpointsJSON)
}


module.exports = {getEndpoints}