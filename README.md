# Markov Machine Text Generator

## Overview

This exercise generates random realistic machine-made text based on input text, using a Markov Chain algorithm.

## Features

- Parses input text into chains of words.
- Generates random text based on the chains.
- Accepts text input from files or URLs.
- Handles errors for invalid inputs.

## Steps

1. **Setup**

   - Create a project directory and initialize it with a Git repository.

     - `git init`

   - Add a `.gitignore` file to exclude `node_modules`.

     - `echo "node_modules/" > .gitignore`

   - Initialize `package.json`.

     - `npm init`

2. **Markov Machine Implementation**

   - Create a class `MarkovMachine` with methods to:
     - Parse text into chains.
     - Generate random text from chains.

3. **Testing**
   - Write tests to verify the functionality.
   - Handle challenges due to the random nature of the algorithm.

## What I learnt

1. `let words = text.split(/[ \r\n]+/);`

   - This splits the input `text` string into an array of words.

   - REGULAR EXPRESSION

     - `/[ \r\n]+/`: This is a regular expression using a regular expression literal, which enclosed within forward slashes(`/`)

     - `[ \r\n]+`: The square brackets(`[]`) define a character class. It matches any one of the enclosed characters. A space(` `), a carriage return(`\r`), OR a newline(`\n`).

     - `\r`: Matches a carriage return.

     - `\n`: Matches a linefeed.

     - `+`: A regular expressions quantifier used to match one or more of the characters.

- `Validation Error`

  ```
  $ jest markov.test.js
  ● Validation Error:

  Option: extensionsToTreatAsEsm: ['.js'] includes '.js' which is always inferred based on type in its nearest package.json.

  Configuration Documentation:
  https://jestjs.io/docs/configuration

  ```

  Including `.js` in `extensionsToTreatAsEsm` is redundant because Jest automatically determines whether `.js` files are ESM or CJS based on the `type` field in `package.json`.

## Questions

1.  `SyntaxError: Cannot use import statement outside a module:`

- Solution: Use CommonJS syntax:

  ```js
  // markov.js

  class MarkovMachine {}

  module.exports = { MarkovMachine };

  // markov.test.js
  const { MarkovMachine } = require("./markov.js");
  ```

**I am not able to figure out how to use ES Module (ESM) syntax in this exercise.**

### What I Have Done

```json
// package.json
{ "type": "module" }
```

```js
// markov.js
export class MarkovMachine {}

// markov.test.js
// ES Module syntax
import { MarkovMachine } from "./markov.js";
```

- Then the following message appears after running `$ jest markov.test.js`

  ```
  $ jest markov.test.js
  FAIL  ./markov.test.js
  ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    C:\Users\kwokk\Desktop\Springboard\exercise\node-markov\markov.test.js:2
    import { MarkovMachine } from "./markov.js";
    ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      at Runtime.createScriptFromCode (../../../../AppData/Roaming/npm/node_modules/jest/node_modules/jest-runtime/build/index.js:1505:14)

      Test Suites: 1 failed, 1 total
      Tests:       0 total
      Snapshots:   0 total
      Time:        0.481 s
      Ran all test suites matching /markov.test.js/i.
  ```

- I then updated Jest Configuration to enable ESM support for Jest.

  ```json
  // package.json
  {
    "jest": {
      "testEnvironment": "node",
      "extensionsToTreatAsEsm": [".js"]
    }
  }
  ```

  But the following message appears:

  ```
  $ jest markov.test.js
  ● Validation Error:

  Option: extensionsToTreatAsEsm: ['.js'] includes '.js' which is always inferred based on type in its nearest package.json.

  Configuration Documentation:
  https://jestjs.io/docs/configuration

  ```

- To solve the Validation Error, I removed Jest configguration in `package.json`, created and updated `jest.config.js`:

  ```js
  // jest.config.js
  export default {
    testEnvironment: "node",
    transform: {},
  };
  ```

- Next, I installed `jest-environment-node`:

  `npm install --save-dev jest-environment-node`

  Validation Error still occurs:

  ```
  $ jest markov.test.js
  ● Validation Error:

  Option: extensionsToTreatAsEsm: ['.js'] includes '.js' which is always inferred based on type in its nearest package.json.

  Configuration Documentation:
  https://jestjs.io/docs/configuration

  ```

- I also updated `test` script in `package.json`:

  ```json
    "scripts": {
    "test": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js"
  }
  ```

- I now then able to use `npm test` command to run Jest with ESM support, but still not able to use `jest` command. Jest has trouble parsing the `import` statement.

  ```
    import { MarkovMachine } from "./markov.js";
    ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1505:14)
  ```
