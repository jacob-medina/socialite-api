const { Schema, model, Types } = require('mongoose');
const { formatDate } = require('../utils/helpers.js');
const reactionSchema = require('./reactionSchema.js');
// const { User } = require('../models');

const thoughtSchema = new Schema({
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
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: { virtuals: true, getters: true }
});

thoughtSchema.virtual('reactionCount')
    .get(function() {
        return this.reactions.length;
    });

// thoughtSchema.virtual('username')
//     .get(async function() {
//         return await User.findById(new Types.ObjectId(this.userId)).username;
//     })

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;