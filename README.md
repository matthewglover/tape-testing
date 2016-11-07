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

#### Step 2 - Core assertions


- Compare simple values (numbers, strings and booleans):

```javascript
test('Comparing simple values (numbers, strings and booleans)', function (t) {
  t.plan(3);  // Assert how many assertions in test
  t.equal(1, 1, 'Compare simple values');
  t.equal('abc', 'abc');    // Messages are optional
  t.equal(true, true);
  t.end();
});
```

- Compare arrays and objects:

```javascript
test('Comparing arrays and objects', function (t) {
  t.deepEqual([1, 2, 3], [1, 2, 3]);
  t.deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 });
  t.end();
});
```

- You can (and should) still use equal if you're comparing the same object:

```javascript
test('Comparing the same array/object you can still use equal', function (t) {
  var arr = [1, 2, 3];
  var obj = { a: 1, b: 2 };
  var identity = function (x) { return x; };

  t.equal(arr, identity(arr));
  t.equal(obj, identity(obj));
  t.end();
});

```

- Assert truthy / falsy values:

```javascript
test('Check values are truthy', function (t) {
  t.ok(true);
  t.ok(1);
  t.ok('string');
  t.ok({});
  t.ok([]);
  t.end();
});

test('Check values are falsy', function (t) {
  t.notOk(false);
  t.notOk(0);
  t.notOk('');
  t.end();
});
```


#### Step 3 - Asynchronous callbacks

- Declare a callback function to test:

```javascript
function asyncDouble (n, cb) {
  setTimeout(function () {
    if (typeof n !== 'number') {
      cb(new TypeError('Expected number'));
    } else {
      cb(null, n * 2);
    }
  }, 10);
}
```

- Test success:

```javascript
test('Handle callbacks: success', function (t) {
  t.plan(2);    // With t.plan(), no need for t.end()
  asyncDouble(10, function (error, result) {
    t.error(error);
    t.equal(result, 20);
  });
});
```

- Test failure:

```javascript
test('Handle callbacks: error', function (t) {
  asyncDouble('10', function (error, result) {
    t.ok(error instanceof TypeError);
    t.end();
  });
});
```

#### Step 4 - Handling errors

- Declare an error throwing function to test:

```javascript
function checkWin (score) {
  if (score < 20) {
    throw new Error('Too low');
  } else {
    return 'You win!';
  }
}
```

- Handle success:

```javascript
test('Handle success', function (t) {
  t.equals(checkWin(20), 'You win!');
  t.end();
});
```

- Handle errors:

```javascript
test('Handle errors', function (t) {
  t.throws(function () { return checkWin(19); });
  t.end();
});
```

#### Step 5 - Test helpers

- If you only want to run one test use `test.only(...)`

- If you want to skip a test use `test.skip(...)`

- If you want to add a comment (or log something) use `test.comment('your comment')`


#### Step 6 - Testing external files

- Create a file `src/my_functions.js`

- Move `asyncDouble` and `checkWin` from `my_first_test.js` to `src/my_functions.js`

- Then export the functions:

```javascript
module.exports = {
  asyncDouble,
  checkWin
};
```

- At the top of the file add the following:

```javascript
var myFunctions = require('../src/my_functions');

var asyncDouble = myFunctions.asyncDouble;
var checkWin = myFunctions.checkWin;
```

- Or for a more succinct syntax, use destructuring:

```javascript
var { asyncDouble, checkWin } = require('../src/my_functions');
```



#### Step 7 - Test scripts and reporters

- Add a test script to `package.json` to test all files in the test directory:
```json
...
"scripts": {
    "test": "tape 'test/**/*.js'"
}
...
```

- Run your tests with `npm test`

- Add a reporter for nicer output:
  - install faucet: `npm i D faucet`
  - update the test script: ```tape 'test/**/*.js' | faucet```

- Add a watch script to run test on change of file (require `nodemon` to be installed globally):

```json
...
"scripts": {
    "test": "tape 'test/**/*.js' | faucet",
    "watch": "nodemon -q -x 'npm test'"
}
...
```

- Run your watch command: `npm run watch` and then change your test files to check it re-runs on file save.

## Useful links

- Tape repo: https://github.com/substack/tape

- Articles:
  - https://ponyfoo.com/articles/testing-javascript-modules-with-tape
  - https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4#.w8ncn5s7w
  - https://remysharp.com/2015/12/14/my-node-test-strategy

- AVA (Tape-inspired ES6+ testing framework)- https://github.com/avajs/ava
