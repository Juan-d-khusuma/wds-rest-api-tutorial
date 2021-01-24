const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    toChannel: {
        type: String,
        required: true,
    },
    subscibedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Subscriber', subSchema);