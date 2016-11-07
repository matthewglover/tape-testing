# Testing Nodejs with Tape

## What
An app for demonstrating unit testing Nodejs using Tape.

## Why
Because testing's fun!

## How
Using Nodejs and Tape. Linting with semi-standard.

### Quickstart

First clone the repo and run `npm install`.

#### Step 1 - Basic setup

- Install tape: `npm install --save-dev tape` / `npm i -D tape`

- Create a file: `test/my_first_test.js`

- Open the file and include tape: `var test = require('tape');`

- Write your first test (just to check everything is working):

```javascript
test('Check tape is working with a simple passing test', function (t) {
  t.pass('a message to print out on success');
  t.end();
});
```

- Run your test `node test/my_first_test.js` and you should see:

```bash
TAP version 13
# Check tape is working with a simple passing test
ok 1 a message to print out on success

1..1
# tests 1
# pass  1

# ok
```

## Useful links

- Tape repo: https://github.com/substack/tape

- Articles:
  - https://ponyfoo.com/articles/testing-javascript-modules-with-tape
  - https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4#.w8ncn5s7w
  - https://remysharp.com/2015/12/14/my-node-test-strategy

- AVA (Tape-inspired ES6+ testing framework)- https://github.com/avajs/ava
