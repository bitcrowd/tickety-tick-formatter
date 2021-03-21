"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var template_1 = __importDefault(require("./template"));
describe('template', function () {
    it('replaces any value occurrences', function () {
        var render = template_1.default('{number} => "{word}"');
        var output = render({ number: 12, word: 'dodici' });
        expect(output).toBe('12 => "dodici"');
    });
    it('handles missing values', function () {
        var transforms = { sparkle: function () { return function (s) { return "*" + s + "*"; }; } };
        var render = template_1.default('--{nope | sparkle}', transforms);
        expect(render({})).toBe('--**');
        expect(render()).toBe('--**');
    });
    it('applies value transformations', function () {
        var lowercase = jest.fn(function (s) { return s.toLowerCase(); });
        var dasherize = jest.fn(function (s) { return s.replace(/\s+/g, '-'); });
        var transforms = {
            lowercase: function () { return lowercase; },
            dasherize: function () { return dasherize; },
        };
        var render = template_1.default('= {title | lowercase | dasherize}', transforms);
        var output = render({ title: 'A B C' });
        expect(lowercase).toHaveBeenCalledWith('A B C');
        expect(dasherize).toHaveBeenCalledWith('a b c');
        expect(output).toBe('= a-b-c');
    });
    it('supports parameterized transformations', function () {
        var long = 'abcdefghijklmnopqrstuvwxyz';
        var substring = function (start, end) { return function (s) {
            return s.substring(start, end);
        }; };
        var transforms = { substring: substring };
        var render = template_1.default('pre {long | substring(15, 18)} post', transforms);
        var output = render({ long: long });
        expect(output).toBe('pre pqr post');
    });
    it('handles missing transformations', function () {
        var render = template_1.default('a{a | ??}', {});
        var output = render({ a: '++' });
        expect(output).toBe('a!!(no helper named "??")');
    });
    it('handles invalid transformation parameters', function () {
        var int = function (s) { return Number.parseInt(s, 10); };
        var pow = function (exp) { return function (s) { return Math.pow(int(s), int(exp)); }; };
        var render = template_1.default('{a | pow(break)}', { pow: pow });
        var output = render({ a: 12 });
        expect(output).toBe('!!(invalid parameters provided to "pow": break)');
    });
    it('ignores whitespace within template expressions', function () {
        var transforms = {
            triple: function () { return function (a) { return a * 3; }; },
            square: function () { return function (a) { return a * a; }; },
        };
        var render = template_1.default('({ a } * 3)**2 = {  a  |  triple  |  square  }', transforms);
        var output = render({ a: 2 });
        expect(output).toBe('(2 * 3)**2 = 36');
    });
    it('handles incomplete template expressions (no closing brace)', function () {
        var render = template_1.default('{', {});
        var output = render({});
        expect(output).toBe('{');
    });
    it('handles incomplete template expressions (incomplete filter pipeline)', function () {
        var trim = function () { return function (s) { return s.trim(); }; };
        var render = template_1.default('{a | trim |}', { trim: trim });
        var output = render({});
        expect(output).toBe('!!(no helper named "undefined")');
    });
});
