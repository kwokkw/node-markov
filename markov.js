/** Textual markov chain generator */

class MarkovMachine {
  /** build/initialize markov machine; read in text.*/

  constructor(text) {
    // Split the input text into words, accounting for spaces and line breaks.
    //
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
  }
}
