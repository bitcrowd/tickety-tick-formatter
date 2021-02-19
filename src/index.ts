import * as helpers from './helpers';
import pprint from './pretty-print';
import compile from './template';
import { ParseFn, FormatterName } from './types';

export { helpers };

const fallbacks = {
  type: 'feature',
};

export const defaults = {
  branch: '{type | slugify}/{id | slugify}-{title | slugify}',
  commit: '[#{id}] {title}\n\n{description}\n\n{url}',
  command: 'git checkout -b {branch | shellquote} && git commit --allow-empty -m {commit | shellquote}'
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderer = (templates: any, name: FormatterName): ParseFn => {
  const render = name in templates
                 ? compile(templates[name], helpers)
                 : compile(defaults[name], helpers);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (values: any) => render({ ...fallbacks, ...values }).trim();
};

interface Parser {
  branch: ParseFn,
  command: ParseFn,
  commit: ParseFn,
}

export default (templates = {}, prettify = true): Parser => {
  const branch = renderer(templates, 'branch');

  const commitFn = renderer(templates, 'commit');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const commit = prettify ? (values: any) => pprint(commitFn(values)) : commitFn;

  const commandFn = renderer(templates, 'command');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const command = (values: any): string =>
    commandFn({
      branch: branch(values),
      commit: commit(values),
      ...values,
    });

  return { branch, command, commit };
};