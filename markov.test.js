// ES Module syntax
import { MarkovMachine } from "./markov.js";

// Grouping Tests
describe("Test makeChains method", () => {
  let mm;
  let chains;

  // Setup before each test
  beforeEach(() => {
    mm = new MarkovMachine("the cat in the hat");
    chains = mm.chains;
  });

  // Cleanup after each test
  afterEach(() => {
    mm = null;
    chains = null;
  });

  test("Each key should have an array", () => {
    Object.keys(chains).forEach((key) => {
      expect(Array.isArray(chains[key]));
    });
  });

  test("The value of the last word should be null", () => {
    const lastWord = "hat";
    expect(chains[lastWord]).toEqual([null]);
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

// Grouping Tests
describe("Test makeText method", () => {
  let mm;
  let chains;

  // Setup before each test
  beforeEach(() => {
    mm = new MarkovMachine("the cat in the hat");
    chains = mm.chains;
  });

  // Cleanup after each test
  afterEach(() => {
    mm = null;
    chains = null;
  });

  test("Test output length", () => {
    const output = mm.makeText();
    const count = output.split(" ").length;
    expect(count).toBeLessThanOrEqual(100);
  });

  test("Output text contains only valid words", () => {
    const output = mm.makeText();
    const words = output.split(" ");
    words.forEach((word) => {
      expect(Object.keys(chains)).toContain(word);
    });
  });

  test("Test randomness", () => {
    const outputs = [];
    for (let i = 0; i < 100; i++) {
      const output = mm.makeText();
      const firstWord = output.split(" ")[0];
      outputs.push(firstWord);
    }
    const uniqueWords = new Set(outputs);
    expect(uniqueWords.size).toBeGreaterThan(1);
  });
});
