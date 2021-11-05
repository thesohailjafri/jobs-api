const { UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')
const auth = async (req, res, next) => {
    const bearerToken = req.headers.authorization

    if (!bearerToken || bearerToken.split(' ')[0] !== 'Bearer') {
        throw new UnauthenticatedError('No token provided')
    }

    const token = bearerToken.split(' ')[1]
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
}

module.exports = auth