var Noop = require('./validators/noop');
var notNull = require('./validators/notNull');
var isEmail = require('./validators/isEmail');
var isNumber = require('./validators/isNumber');
var notEmpty = require('./validators/notEmpty');
var Validators = {
    getValidator: getValidator,
    notNull: notNull,
    isEmail: isEmail,
    isNumber: isNumber,
    notEmpty: notEmpty
};
function getValidator(method, params, paramsParsed) {
    if (!Validators[method]) {
        return new Noop();
    }
    return new Validators[method](params, paramsParsed);
}
module.exports = Validators;
