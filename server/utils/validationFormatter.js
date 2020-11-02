const { validationResult } = require("express-validator");

const result = validationResult.withDefaults({
    formatter: e => e.msg
});

/**
 * @typedef {Object} validationResult
 * @property {boolean} isEmpty - Is the errors object empty
 * @property {Object} errors - The returned errors (if any)
 * 
 */
module.exports = (req) => {
    const errors = result(req);

    return {
        isEmpty: errors.isEmpty(),
        errors: errors.mapped({ onlyFirstError: true })
    }
}