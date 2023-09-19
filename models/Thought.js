const { Schema, model, Types } = require('mongoose');
const { formatDate } = require('../utils/helpers.js');
const reactionSchema = require('./reactionSchema.js');

const thoughtSchema = Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: formatDate
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
});

thoughtSchema.virtual('reactionCount')
    .get(function() {
        return this.reactions.length;
    });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;