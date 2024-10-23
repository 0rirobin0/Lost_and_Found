const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone:
    {
        type: Number,
        required:true
    },
    password:
    {
        type: String,
        required:true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // role can be 'user' or 'admin'
        default: 'user' // default role is 'user'
    }
});

const Users = mongoose.model('User', UsersSchema);

module.exports = Users;
