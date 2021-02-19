"use strict";
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
var _1 = __importStar(require("."));
var pretty_print_1 = __importDefault(require("./pretty-print"));
jest.mock('./pretty-print', function () { return jest.fn(); });
describe('ticket formatting', function () {
    var ticket = {
        id: 'BTC-042',
        title: 'Add more tests for src/common/format/index.js',
        type: 'new enhancement',
    };
    beforeEach(function () {
        pretty_print_1.default.mockClear();
    });
    describe('default format', function () {
        var fmt = _1.default({}, false);
        describe('commit', function () {
            it('includes ticket id and title', function () {
                var formatted = fmt.commit(ticket);
                expect(formatted).toBe("[#" + ticket.id + "] " + ticket.title);
            });
        });
        describe('branch', function () {
            var slugify = _1.helpers.slugify();
            it('includes ticket type, id and title', function () {
                var formatted = fmt.branch(ticket);
                expect(formatted).toBe(slugify(ticket.type) + "/" + slugify(ticket.id) + "-" + slugify(ticket.title));
            });
            it('formats type to "feature" if not provided', function () {
                var typeless = { id: ticket.id, title: ticket.title };
                var formatted = fmt.branch(typeless);
                expect(formatted).toBe("feature/" + slugify(ticket.id) + "-" + slugify(ticket.title));
            });
        });
        describe('command', function () {
            var shellquote = _1.helpers.shellquote();
            it('includes the quoted branch name and commit message', function () {
                var branch = fmt.branch(ticket);
                var commit = fmt.commit(ticket);
                var formatted = fmt.command(ticket);
                expect(formatted).toBe("git checkout -b " + shellquote(branch) +
                    (" && git commit --allow-empty -m " + shellquote(commit)));
            });
        });
    });
    describe('with pretty-printing enabled', function () {
        var stdfmt = _1.default({}, false);
        var fmt = _1.default({}, true);
        describe('commit', function () {
            it('is pretty-printed', function () {
                pretty_print_1.default.mockReturnValue('pretty-printed commit');
                var original = stdfmt.commit(ticket);
                var formatted = fmt.commit(ticket);
                expect(pretty_print_1.default).toHaveBeenCalledWith(original);
                expect(formatted).toBe('pretty-printed commit');
            });
        });
    });
});
