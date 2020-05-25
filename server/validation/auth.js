const { check } = require("express-validator");

module.exports = [
    check("username", "Username is required")
        .not()
        .isEmpty(),
    check("password", "Password is required")
        .not()
        .isEmpty()
]