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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaults = exports.helpers = void 0;
var helpers = __importStar(require("./helpers"));
exports.helpers = helpers;
var pretty_print_1 = __importDefault(require("./pretty-print"));
var template_1 = __importDefault(require("./template"));
var fallbacks = {
    type: 'feature',
};
exports.defaults = {
    branch: '{type | slugify}/{id | slugify}-{title | slugify}',
    commit: '[#{id}] {title}\n\n{description}\n\n{url}',
    command: 'git checkout -b {branch | shellquote} && git commit --allow-empty -m {commit | shellquote}'
};
/* eslint-disable @typescript-eslint/no-explicit-any */
var renderer = function (templates, name) {
    var render = name in templates
        ? template_1.default(templates[name], helpers)
        : template_1.default(exports.defaults[name], helpers);
    /* eslint-disable @typescript-eslint/no-explicit-any */
    return function (values) { return render(__assign(__assign({}, fallbacks), values)).trim(); };
};
exports.default = (function (templates, prettify) {
    if (templates === void 0) { templates = {}; }
    if (prettify === void 0) { prettify = true; }
    var branch = renderer(templates, 'branch');
    var _commit = renderer(templates, 'commit');
    /* eslint-disable @typescript-eslint/no-explicit-any */
    var commit = prettify ? function (values) { return pretty_print_1.default(_commit(values)); } : _commit;
    var _command = renderer(templates, 'command');
    /* eslint-disable @typescript-eslint/no-explicit-any */
    var command = function (values) {
        return _command(__assign({ branch: branch(values), commit: commit(values) }, values));
    };
    return { branch: branch, command: command, commit: commit };
});
