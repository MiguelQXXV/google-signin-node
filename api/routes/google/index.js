const passport = require("passport");
const auth = require('./../../controller/google');
const default_uri = '/api/google';

module.exports = function (app) {
    app
        .route(`${default_uri}`)
        .get(passport.authenticate("google", { scope: ["profile", "email"] }));

    app
        .route(`${default_uri}/callback`)
        .get(
            passport.authenticate("google", { failureRedirect: `${default_uri}` }),
            auth.google_sign_in_callback
        );
};
