const Initial = require('./default');
const Google = require('./google');

module.exports = function (app) {
    Initial(app);
    Google(app);
};
