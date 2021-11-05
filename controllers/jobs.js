const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')

const getJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId })
    if (!jobs) {
        throw new NotFoundError('Jobs not found')
    }
    res.status(StatusCodes.OK).json({ jobs })
}

const getJob = async (req, res) => {
    const job = await Job.findOne({ _id: req.params.id, createdBy: req.user.userId })
    if (!job) {
        throw new NotFoundError('Job not found')
    }
    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}


const updateJob = async (req, res) => {
    const job = await Job.findOneAndUpdate({ _id: req.params.id, createdBy: req.user.userId }, { status: req.body.status }, { new: true, runValidators: true })
    if (!job) {
        throw new NotFoundError('Job not found')
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const job = await Job.findOneAndDelete({ _id: req.params.id, createdBy: req.user.userId })
    if (!job) {
        throw new NotFoundError('Job not found')
    }
    res.status(StatusCodes.OK).json({ job })
}

module.exports = {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}