const { Schema, model, Types } = require('mongoose');
const { formatDate } = require('../utils/helpers.js');

const reactionSchema = Schema({
    reactionId: {
        type: Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: formatDate
    },
});

module.exports = reactionSchema;