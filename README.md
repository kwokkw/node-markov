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

I am not able to figure out how to use ES Module (ESM) syntax in this exercise.

1. How is `package-lock.json` being generated?

2. How to install dependencies?

## Continue Development
