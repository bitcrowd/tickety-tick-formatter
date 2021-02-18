"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pretty_print_1 = __importDefault(require("./pretty-print"));
describe('pretty-print', function () {
    it('capitalizes subject lines', function () {
        expect(pretty_print_1.default('apply proper casing')).toBe('Apply proper casing');
        expect(pretty_print_1.default('[#42] capitalize subject')).toBe('[#42] Capitalize subject');
        expect(pretty_print_1.default('[#lowercase-id] capitalize subject')).toBe('[#lowercase-id] Capitalize subject');
    });
    it('wraps overlong subject lines', function () {
        var input = 'Wrap commit subject lines with more than 50 characters and insert one blank line before the remaining subject text. Wrap the remaining subject text to 72 characters.';
        expect(pretty_print_1.default(input)).toMatchSnapshot();
    });
    it('wraps overlong body lines', function () {
        var input = "Wrap body lines\n\nMore detailed explanatory text is wrapped to 72 characters. The blank line separating the subject from the body is critical unless you omit the body entirely.\n    ";
        expect(pretty_print_1.default(input)).toMatchSnapshot();
    });
    it('formats lists', function () {
        var input = "Format lists in body\n\n* Bullet points are okay too\n* Typically a hyphen or asterisk is used for the bullet, followed by a\nsingle space, with blank lines in between, but conventions vary here\n* Use a hanging indent\n    ";
        expect(pretty_print_1.default(input)).toMatchSnapshot();
    });
    it('strips leading and trailing blank lines and whitespace', function () {
        var input = "\n\n  Remove whitespace around subject line\n\n\nAlso, remove additional blank lines before and after body.\n\nPreserve blank lines between paragraphs of the body.\n\nStrip whitespace on empty lines (see line above).\n\nStrip trailing whitespace (see end of this line).\n\n    ";
        expect(pretty_print_1.default(input)).toMatchSnapshot();
    });
    it('strips body indentation', function () {
        var input = "Strip body indentation\n\n      Unindent this line.\n      Move this one up.\n\n          function leave(me) {\n            return 'indented';\n          }\n\n      And continue.\n    ";
        expect(pretty_print_1.default(input)).toMatchSnapshot();
    });
});
