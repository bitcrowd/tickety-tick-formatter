import * as helpers from './helpers';
import pprint from './pretty-print';
import compile from './template';
import { FormatFn, Formatter, FormatterName, Templates, Ticket } from './types';

export { helpers };

const fallbacks = {
  type: 'feature',
};

export const templateDefaults = {
  branch: '{type | slugify}/{id | slugify}-{title | slugify}',
  commit: '[#{id}] {title}\n\n{description}\n\n{url}',
  command:
    'git checkout -b {branch | shellquote} && git commit --allow-empty -m {commit | shellquote}',
};

const renderer = (templates: Templates, name: FormatterName): FormatFn => {
  const completeTemplates = { ...templateDefaults, templates };
  const render = compile(completeTemplates[name], helpers);

  return (ticket: Ticket) => render({ ...fallbacks, ...ticket }).trim();
};

export default (templates = {}, prettify = true): Formatter => {
  const branch = renderer(templates, 'branch');

  const commitFn = renderer(templates, 'commit');

  const commit = prettify
    ? (ticket: Ticket) => pprint(commitFn(ticket))
    : commitFn;

  const commandFn = renderer(templates, 'command');

  const command = (ticket: Ticket): string =>
    commandFn({
      branch: branch(ticket),
      commit: commit(ticket),
      ...ticket,
    });

  return { branch, command, commit };
};
