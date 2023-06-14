const { Schema, Types } = require('mongoose');

// Reaction Schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        require: true,
        maxLength: 280
    },
    username: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // use a getter method to format the timestamp on query
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
});

// export the Reaction model
module.exports = reactionSchema;


function dateFormat(date) {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
}