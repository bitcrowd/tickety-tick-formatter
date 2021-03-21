"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var trim = function (s) { return s.trim(); };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function safe(fn) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function wrapped() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            return fn.apply(void 0, args);
        }
        catch (err) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            return "!!(" + err.message + ")";
        }
    };
}
function raise(message) {
    return function raises() {
        throw new Error(message);
    };
}
// Turn an expression into a pipeline function.
//
// Example expressions:
//
//   'lowercase'
//   'lowercase()'
//   'substring(3)'
//   'substring(0, 10)'
//
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function make(expr, transforms) {
    var _a;
    if (transforms === void 0) { transforms = {}; }
    var _b = (_a = expr.match(/^([^()]+)(\((.+)\))?$/)) !== null && _a !== void 0 ? _a : [], name = _b[1], _c = _b[3], argstr = _c === void 0 ? '' : _c;
    var fn = transforms[name];
    if (typeof fn !== 'function')
        return raise("no helper named \"" + name + "\"");
    try {
        var args = JSON.parse("[" + argstr + "]");
        return fn.apply(void 0, args);
    }
    catch (_) {
        return raise("invalid parameters provided to \"" + name + "\": " + argstr);
    }
}
// Compile a template string into a render function.
//
// Example strings:
//
//   'a = {v}'
//   'b = {v | lowercase}'
//   'c = {v | lowercase | substring(0, 3)}'
//
function compile(template, transforms) {
    if (transforms === void 0) { transforms = {}; }
    var parts = template.match(/\{[^}]*\}|[^{]+/g);
    if (parts === null)
        return function () { return template; };
    var fns = parts.map(function (part) {
        if (part[0] === '{' && part[part.length - 1] === '}') {
            var _a = part
                .replace(/^\{|\}$/g, '')
                .split('|')
                .map(trim), key_1 = _a[0], procs = _a.slice(1);
            var pipeline_1 = procs.map(function (expr) { return safe(make(expr, transforms)); });
            return function (values) { var _a; return pipeline_1.reduce(function (v, fn) { return fn(v); }, (_a = values[key_1]) !== null && _a !== void 0 ? _a : ''); };
        }
        return function () { return part; };
    });
    return function (values) {
        if (values === void 0) { values = {}; }
        return fns.map(function (fn) { return fn(values); }).join('');
    };
}
exports.default = compile;
