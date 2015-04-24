var Noop = require('./validators/noop');
var notNull = require('./validators/notNull');
var isEmail = require('./validators/isEmail');
var isNumber = require('./validators/isNumber');
var Validators = {
    getValidator: getValidator,
    notNull: notNull,
    isEmail: isEmail,
    isNumber: isNumber
};
function getValidator(method, params, paramsParsed) {
    if (!Validators[method]) {
        return new Noop();
    }
    return new Validators[method](params, paramsParsed);
}
module.exports = Validators;
