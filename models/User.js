const { Schema, model } = require('mongoose');

// User Schema
const userSchema = new Schema({
username: {
    type: String,
    require: true,
    unique: true,
    trim: true,
},
email: {
    type: String,
    require: true,
    Unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
},
thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought',
    index: true,
}
],
friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
}]
},
{
    toJSON: {
        virtuals: true,
    },
});

// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function() {
return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', userSchema);

// export the User model
module.exports = User;