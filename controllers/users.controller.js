const {fetchAllUsers} = require('../models/users.model')

async function getUsers(req, res, next) {
    try {
        const usersArray = await fetchAllUsers()
        res.status(200).send({users: usersArray})
    }
    catch(err) {
        next(err)
    }
}


module.exports = {getUsers}