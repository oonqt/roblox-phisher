const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema({
    time: {
        type: Date,
        default: Date.now
    },
    username: String,
    password: String,
    ip: String
});

module.exports = mongoose.model("auths", AuthSchema);