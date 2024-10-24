"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
exports.login = login;
exports.role = role;
function login(req, res, next) {
    if (req.session.token) {
        next();
    }
    else {
        res.redirect('/login');
    }
}
function role() {
    return function (req, res, next) {
        if (req.session) {
            return next();
        }
        else {
            res.locals.errorMessage = 'You must be logged in to view this page';
        }
    };
}
var user = function (req, res, next) {
    if (req.session && req.session.user) {
        res.locals.user = req.session.user;
    }
    next();
};
exports.user = user;
