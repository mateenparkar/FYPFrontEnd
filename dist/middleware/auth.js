"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.role = exports.login = void 0;
function login(req, res, next) {
    if (req.session.token) {
        next();
    }
    else {
        res.redirect('/login');
    }
}
exports.login = login;
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
exports.role = role;
var user = function (req, res, next) {
    if (req.session && req.session.user) {
        res.locals.user = req.session.user;
    }
    next();
};
exports.user = user;
