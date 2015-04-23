var Noop = require('./validators/noop');
var notNull = require('./validators/notNull');
var Validators = {
    getValidator: getValidator,
    notNull: notNull
};
function getValidator(method, params, paramsParsed) {
    if (!Validators[method]) {
        return new Noop();
    }
    return new Validators[method](params, paramsParsed);
}
module.exports = Validators;
