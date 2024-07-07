const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    contactDetails:{
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
    },
    profiles:{
        linkedIn: {
            type: String,
            required: true,
        },
        github: {
            type: String,
            required: true,
        },
    },
    customerStatus:{
        type: String,
        required: true,
    },
    projectStatus:{
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;