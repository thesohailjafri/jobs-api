const mongoose = require('mongoose')
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide job title'],
        trim: true,
        minlength: [3, 'Job title must be at least 3 characters long'],
        maxlength: [255, 'Job title must be less than 255 characters long'],
    },
    description: {
        type: String,
        required: [true, 'Please provide job description'],
        trim: true,
        minlength: [12, 'Job description must be at least 12 characters long'],
    },
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        trim: true,
        minlength: [3, 'Company name must be at least 3 characters long'],
        maxlength: [255, 'Company name must be at least 3 characters long'],
    },
    status: {
        type: String,
        required: [true, 'Please provide job status'],
        trim: true,
        minlength: [3, 'Job status must be at least 3 characters long'],
        enum: {
            values: ['applied', 'seen', 'interview', 'offer', 'rejected'],
            message: '{VALUE} is not supported'
        },
        default: 'applied',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('Job', jobSchema)