const User = require('../models/User')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const login = async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Email and password are required')
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
        throw new UnauthenticatedError('Invalid credentials')
    }


    const token = user.generateToken()
    res.status(StatusCodes.OK).json({ "user": { "id": user._id, "email": user.email, "name": user.name }, token })

}

const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        throw new BadRequestError('Name, email and password are required')
    }
    const user = await User.create({ name, email, password })
    const token = user.generateToken()
    res.status(StatusCodes.CREATED).json({ "user": { "id": user._id, "email": user.email, "name": user.name }, token })
}

module.exports = { login, register }