var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: [true, 'First Name must not be empty']},
    lastName: { type: String , required: [true, 'Last Name must not be empty']},
    email: {
        type: String,
        required: [true, 'Email must not be empty']
    },
    password: { type: String,
        required: [true, 'Password must not be empty']
    }
});

module.exports = mongoose.model('users', userSchema)
