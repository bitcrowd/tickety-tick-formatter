"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uppercase = exports.truncate = exports.trim = exports.substring = exports.slugify = exports.shellquote = exports.lowercase = void 0;
var speakingurl_1 = require("speakingurl");
var lowercase = function () { return function (s) {
    return s.toLowerCase();
}; };
exports.lowercase = lowercase;
var shellquote = function () { return function (s) {
    return typeof s === 'string' ? "'" + s.replace(/'/g, "'\\''") + "'" : "''";
}; };
exports.shellquote = shellquote;
var slugify = function (separator) {
    if (separator === void 0) { separator = '-'; }
    return speakingurl_1.createSlug({ separator: separator });
};
exports.slugify = slugify;
var substring = function (start, end) { return function (s) { return s.substring(start, end); }; };
exports.substring = substring;
exports.substring.description = 'substring(start-index[, end-index])';
var trim = function () { return function (s) { return s.trim(); }; };
exports.trim = trim;
var truncate = function (limit) { return function (s) {
    return s.length > limit ? s.substring(0, limit - 1) + "\u2026" : s;
}; };
exports.truncate = truncate;
exports.truncate.description = 'truncate(max-length)';
var uppercase = function () { return function (s) { return s.toUpperCase(); }; };
exports.uppercase = uppercase;
