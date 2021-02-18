# Tickety-Tick Formatter

> Format your tickets into git-digestable branch names and commit messages

This formatter takes an `id`, `type`, `subject`, and `url` of a ticket (e.g. from GitHub issues, Jira, or any other ticket system) and converts it to:

* a Git branch name, e.g. `feature/42-find-the-answer`
* a default commit message, e.g.
  ```
  [#42] Find The Answer

  As a reader of many books, I stumbled upon the ultimate answer to everything.
  We now need to find the answer.

  https://github.com/bitcrowd/tickety-tick-formatter/issues/42
  ```
* a shell command for creating a new branch with an empty commit having the above branch name and commit message

This package is prominently used in [tickety-tick](https://github.com/bitcrowd/tickety-tick), [bitcrowd's](https://bitcrowd.net) browser extension to standardize a team's Git workflow.


## Install

```sh
npm install tickety-tick-formatter
```

## Usage

```js
import {formatter} from 'tickety-tick-formatter'

const ticket = {
  id: 42,
  title: 'Find The Answer',
  description: 'As a reader of many books....',
  type: 'Feature',
  url: 'https://github.com/bitcrowd/tickety-tick-formatter/issues/42'
};

const { branch, commit, command } = formatter();

branch(ticket);
// 'feature/42-find-the-answer'

commit(ticket);
// '[#42] Find The Answer\n\nAs a reader of many books...\n\nhttps://github.com/bitcrowd/tickety-tick-formatter/issues/42'

command(ticket);
// `git checkout -b feature/42-find-the-answer && git commit --allow-empty -m [#42] Find The Answer
//
// As a reader of many books...
//
// https://github.com/bitcrowd/tickety-tick-formatter/issues/42`
```

It is possible to configure custom templates for each type of output:

```js
const templates = {
  branch: '{id | slugify}_{title | slugify}',
  commit: '[#{id}] {title}\n\n{description}\n\n{url}'
  command: 'git checkout -b {branch | shellquote} && git commit --allow-empty -m {commit | shellquote}'
};

const {branch, commit, command} = formatter();

branch(ticket);  // '42_find-the-answer'
```

## Building

In order to build the extension from source, run:

```shell
npm install
npm run checks
npm run build
```

For development, it may be easier to use `npm run build -- --watch` for continuous building.
A build, compiles the TypeScript sources from `src` to JavaScript in `dist`.
The compiled JavaScript sources are intended to be commited.

### Releasing a new version

1. Tick the version with [`npm version`](https://docs.npmjs.com/cli/v7/commands/npm-version) (creates a Git tag)
1. Compile our TypeScript sources `npm run build`
1. Push the tag with `git push --tags`
1. Draft a [new release on GitHub](https://github.com/bitcrowd/tickety-tick/releases/new)
1. Add package bundles to your new release

### Auto-formatting of commit messages in our default templates

The Tickety-Tick formatter supports formatting commit messages according to [these recommendations](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) by [Tim Pope](https://github.com/tpope/) in the default template.
