const { check } = require("express-validator");

module.exports = [
    check("key", "Key is required")
        .not()
        .isEmpty()
]