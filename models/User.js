const { Schema, model, Types } = require('mongoose');
const emailRegex = /^([\w-\/._]+)@([\w-\/._]+).[a-z]{2,4}$/;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: emailRegex
    },
    thoughts: [
        {
            type: Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ],
},
{
    toJSON: {
        virtuals: true
    }
});

// get friendCount
userSchema.virtual('friendCount')
    .get(function() {
        return this.friends.length;
    });

const User = model('User', userSchema);

module.exports = User;