/** Textual markov chain generator */

export class MarkovMachine {
  /** build/initialize markov machine; read in text.*/

  constructor(text) {
    // Split the input text into words, accounting for spaces and line breaks.
    // Returns a new array.
    let words = text.split(/[ \r\n]+/);

    // Filter out empty strings from the word array.
    this.words = words.filter((c) => c !== "");

    // Call a helper method to build the chains
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {
   *    "the": ["cat", "hat"],
   *    "cat": ["in"],
   *    "in": ["the"],
   *    "hat": [null]
   *   }
   */

  makeChains() {
    // TODO: Completed

    // Initialize an object to store the chains
    const chains = new Object();

    // Loop through each word
    this.words.forEach((currentWord, index) => {
      // Find the next word
      const nextWord = this.words[index + 1];

      // Update the chains
      if (!(currentWord in chains)) {
        chains[currentWord] = [];
      }

      chains[currentWord].push(nextWord || null);
    });

    this.chains = chains;
  }

  /** return random text from chains */

  // Accept an optional numWords argument (default it to 100).
  makeText(numWords = 100) {
    // TODO: Completed

    // Initialize an array to store the words
    const output = [];
    const keys = Object.keys(this.chains);

    // Pick a random starting word
    const idx = Math.floor(Math.random() * keys.length);
    let currentWord = keys[idx];
    output.push(currentWord);

    // Generate Text
    for (let i = 1; i < numWords; i++) {
      const nextWords = this.chains[currentWord];

      const idx = Math.floor(Math.random() * nextWords.length);
      const nextWord = nextWords[idx];

      if (nextWord === null) break;

      output.push(nextWord);
      currentWord = nextWord;
    }
    return output.join(" ");
  }
}

let mm = new MarkovMachine("the cat in the hat");
mm.makeText();

// CommonJS module
// module.exports = { MarkovMachine };
