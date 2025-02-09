"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
var validateUser = function (user) {
    var password = user.password;
    var email = user.username;
    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one upper case letter.';
    }
    if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lower case letter.';
    }
    if (!/[@#$%^&+=]/.test(password)) {
        return 'Password must contain at least one special character (@#$%^&+=).';
    }
    var emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(email)) {
        return 'Invalid email address';
    }
    return '';
};
exports.validateUser = validateUser;
