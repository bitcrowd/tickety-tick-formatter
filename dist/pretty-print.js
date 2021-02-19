"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parser_markdown_1 = __importDefault(require("prettier/parser-markdown"));
var standalone_1 = __importDefault(require("prettier/standalone"));
var strip_indent_1 = __importDefault(require("strip-indent"));
var widths = { subject: 50, body: 72 };
var config = { parser: 'markdown', plugins: [parser_markdown_1.default] };
function format(text, width) {
    return standalone_1.default.format(text, __assign(__assign({}, config), { printWidth: width, proseWrap: 'always' }));
}
function split(text, separator) {
    var position = text.indexOf(separator);
    if (position < 0)
        return [text, null];
    var head = text.substring(0, position);
    var tail = text.substring(position + separator.length);
    return [head, tail];
}
function capitalize(text) {
    return text.replace(/^[a-zA-Z]|\s[a-zA-Z]/, function (w) { return w.toUpperCase(); });
}
function gitsubject(text) {
    var subject = capitalize(text.trim());
    if (subject.length > widths.subject) {
        var _a = split(format(subject, widths.subject - 1), '\n'), start = _a[0], rest = _a[1];
        return [start + "\u2026", format("\u2026" + rest, widths.body)].join('\n\n');
    }
    return subject;
}
function gitbody(text) {
    var body = strip_indent_1.default(text.replace(/^(\s*\n)*|\s*$/, ''));
    return format(body, widths.body);
}
function maybe(value, fn) {
    if (value === null)
        return null;
    return fn(value);
}
function print(text) {
    var _a = split(text.trim(), '\n'), line0 = _a[0], rest = _a[1];
    var parts = [maybe(line0, gitsubject), maybe(rest, gitbody)];
    return parts.filter(function (v) { return v !== null; }).join('\n\n');
}
exports.default = print;
