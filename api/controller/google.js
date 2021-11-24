"use strict";
const querystring = require("querystring");

const { REACT_UI } = process.env

var controllers = {
    google_sign_in_callback: function (req, res) {
        const _data = {
            googleId: req.user.googleId.toString(),
            token: req.user.token,
            displayName: req.user.displayName,
            image: req.user.image,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
        };

        const _url = querystring.stringify(_data);
        res.cookie("jwt", req.user.token, { expire: new Date() + 9999 });
        res.redirect(`${REACT_UI}/login?${_url}`);
    }
}

module.exports = controllers;
