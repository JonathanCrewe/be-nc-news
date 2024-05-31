const {fetchAllUsers, selectUserByUsername} = require('../models/users.model')

async function getUsers(req, res, next) {
    try {
        const usersArray = await fetchAllUsers()
        res.status(200).send({users: usersArray})
    }
    catch(err) {
        next(err)
    }
}

async function getUserByUsername(req, res, next) {
    try {
        const username = req.params.username

        const user = await selectUserByUsername(username)
        res.status(200).send({user: user})
    }
    catch(err) {
        next(err)
    }
}


module.exports = {getUsers, getUserByUsername}