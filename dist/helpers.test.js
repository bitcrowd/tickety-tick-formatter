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
Object.defineProperty(exports, "__esModule", { value: true });
var helpers = __importStar(require("./helpers"));
describe('format helpers', function () {
    describe('lowercase', function () {
        var lowercase = helpers.lowercase();
        it('lowercases strings', function () {
            expect(lowercase('QUIET')).toBe('quiet');
        });
    });
    describe('shellquote', function () {
        var shellquote = helpers.shellquote();
        it('wraps the input in single-quotes', function () {
            expect(shellquote('echo "pwned"')).toBe('\'echo "pwned"\'');
        });
        it('escapes any single-quotes in the input', function () {
            var input = 'you\'; echo aren\'t "pwned"';
            var quoted = "'you'\\''; echo aren'\\''t \"pwned\"'";
            expect(shellquote(input)).toBe(quoted);
        });
    });
    describe('slugify', function () {
        var slugify = helpers.slugify();
        it('formats normal strings', function () {
            var formatted = slugify('hello');
            expect(formatted).toBe('hello');
        });
        it('lowercases strings', function () {
            var formatted = slugify('Bitcrowd');
            expect(formatted).toBe('bitcrowd');
        });
        it('formats spaces to dashes', function () {
            var formatted = slugify('hello bitcrowd');
            expect(formatted).toBe('hello-bitcrowd');
        });
        it('formats special characters', function () {
            var formatted = slugify('Señor Dévèloper');
            expect(formatted).toBe('senor-developer');
        });
        it('formats umlauts', function () {
            var formatted = slugify('äöüß');
            expect(formatted).toBe('aeoeuess');
        });
        it('strips brackets', function () {
            var formatted = slugify('[#23] Add (more)');
            expect(formatted).toBe('23-add-more');
        });
        it('formats slashes to dashes', function () {
            var formatted = slugify('src/js/format');
            expect(formatted).toBe('src-js-format');
        });
        it('formats dots to dashes', function () {
            var formatted = slugify('format.js');
            expect(formatted).toBe('format-js');
        });
        it('strips hashes', function () {
            var formatted = slugify('##23 #hashtag');
            expect(formatted).toBe('23-hashtag');
        });
        it('accepts a custom separator', function () {
            var formatted = helpers.slugify('_')('##23 #hashtag');
            expect(formatted).toBe('23_hashtag');
        });
    });
    describe('substring', function () {
        var substring = helpers.substring(3, 6);
        it('returns the specified slice of a string', function () {
            expect(substring('abcdefghi')).toBe('def');
        });
    });
    describe('trim', function () {
        var trim = helpers.trim();
        it('removes leading and trailing whitespace', function () {
            expect(trim('\t  black\t\t  ')).toBe('black');
        });
    });
    describe('truncate', function () {
        var truncate = helpers.truncate(3);
        it('truncates strings longer than the limit', function () {
            expect(truncate('abcd')).toBe('ab…');
        });
        it('returns short strings unchanged', function () {
            expect(truncate('abc')).toBe('abc');
        });
    });
    describe('uppercase', function () {
        var uppercase = helpers.uppercase();
        it('uppercases strings', function () {
            expect(uppercase('loud')).toBe('LOUD');
        });
    });
});
