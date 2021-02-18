import * as helpers from './helpers';
import pprint from './pretty-print';
import compile from './template';
import { parseFn, FormatterName } from './types';

export { helpers };

const fallbacks = {
  type: 'feature',
};

export const defaults = {
  branch: '{type | slugify}/{id | slugify}-{title | slugify}',
  commit: '[#{id}] {title}\n\n{description}\n\n{url}',
  command: 'git checkout -b {branch | shellquote} && git commit --allow-empty -m {commit | shellquote}'
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const renderer = (templates:any, name:FormatterName):parseFn => {
  const render = name in templates
                 ? compile(templates[name], helpers)
                 : compile(defaults[name], helpers);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  return (values:any) => render({ ...fallbacks, ...values }).trim();
};

interface Parser {
  branch: parseFn,
  command: parseFn,
  commit: parseFn,
}

export default (templates = {}, prettify = true):Parser => {
  const branch = renderer(templates, 'branch');

  const _commit = renderer(templates, 'commit');

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const commit = prettify ? (values:any) => pprint(_commit(values)) : _commit;

  const _command = renderer(templates, 'command');

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const command = (values:any):string =>
    _command({
      branch: branch(values),
      commit: commit(values),
      ...values,
    });

  return { branch, command, commit };
};