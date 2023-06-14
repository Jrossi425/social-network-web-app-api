const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Thought Schema
const thoughtSchema = new Schema({
thoughtText: {
    type: String,
    require: true,
    minLength: 1,
    maxLength: 280,
},
createdAt: {
    type: Date,
    default: Date.now,
    // use a getter method to format the timestamp on query
    get: (createdAtVal) => format_date(createdAtVal),
},
username: {
    type: String,
    require: true,
},
reactions: [reactionSchema],
},
{
    toJSON: {
        virtuals: true,
    },
});

// get total count of reactions on retrieval
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
    });

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', thoughtSchema);

// export the Thought model
module.exports = Thought;


    function format_date (date) {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    }