import markdown from 'prettier/parser-markdown';
import prettier from 'prettier/standalone';
import unindent from 'strip-indent';

const widths = { subject: 50, body: 72 };

const config = { parser: 'markdown', plugins: [markdown] };

function format(text: string, width: number): string {
  return prettier.format(text, { ...config, printWidth: width, proseWrap: 'always' });
}

function split(text: string, separator: string): string[] {
  const position = text.indexOf(separator);

  if (position < 0) return [text];

  const head = text.substring(0, position);
  const tail = text.substring(position + separator.length);

  return [head, tail];
}

function capitalize(text: string): string {
  return text.replace(/^[a-zA-Z]|\s[a-zA-Z]/, (w) => w.toUpperCase());
}

function gitsubject(text: string): string {
  const subject = capitalize(text.trim());

  if (subject.length > widths.subject) {
    const [start, rest] = split(format(subject, widths.subject - 1), '\n');
    return [`${start}…`, format(`…${rest}`, widths.body)].join('\n\n');
  }

  return subject;
}

function gitbody(text: string): string {
  const body = unindent(text.replace(/^(\s*\n)*|\s*$/, ''));
  return format(body, widths.body);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function maybe(value: any, fn: any): any {
  if (typeof value !== 'string') return value;
  return fn(value);
}

function print(text: string): string {
  const [line0, rest] = split(text.trim(), '\n');
  const parts = [maybe(line0, gitsubject), maybe(rest, gitbody)];
  return parts.filter(Boolean).join('\n\n');
}

export default print;
