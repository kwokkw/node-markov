// ES Module syntax
// import { MarkovMachine } from "./markov.js";

// CommonJS module
const { MarkovMachine } = require("./markov.js");

beforeEach(() => {
  this.mm = new MarkovMachine("the cat in the hat");
  this.chains = this.mm.chains;
});

// Grouping Tests
describe("Test makeChains method", () => {
  test("Each key should have an array", () => {
    Object.keys(this.chains).forEach((key) => {
      expect(Array.isArray(this.chains[key]));
    });
  });

  test("The value of the last word should be null", () => {
    const lastWord = "hat";
    expect(this.chains[lastWord]).toEqual([null]);
  });

  // Edge cases ///////

  test("Empty chains", () => {
    const emptyMachine = new MarkovMachine(" ");
    expect(Object.keys(emptyMachine.chains).length).toBe(0);
  });

  test("Single word input should map to null", () => {
    const mmSingleWord = new MarkovMachine("hello");
    expect(mmSingleWord.chains["hello"]).toEqual([null]);
  });
});

describe("Test makeText method", () => {
  test("Test output length", () => {
    const output = this.mm.makeText();
    const count = output.split(" ").length;
    expect(count).toBeLessThanOrEqual(100);
  });

  test("Output text contains only valid words", () => {
    const output = this.mm.makeText();
    const words = output.split(" ");
    words.forEach((word) => {
      expect(Object.keys(this.chains)).toContain(word);
    });
  });

  test("Test randomness", () => {
    const outputs = [];
    for (i = 0; i < 100; i++) {
      const output = this.mm.makeText();
      const firstWord = output.split(" ")[0];
      outputs.push(firstWord);
    }
    const uniqueWords = new Set(outputs);
    expect(uniqueWords.size).toBeGreaterThan(1);
  });
});
