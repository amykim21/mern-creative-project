const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = require("mongoose").Types.ObjectId;

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    items: [
        {
            _id: {
                type: Schema.Types.ObjectId
            },
            name: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            answer: {
                type: String,
                default: ""
            },
            completed: {
                type: Boolean,
                default: false
            }
        }
    ],
});
const User = mongoose.model("user", UserSchema);
module.exports = User;