/** Command-line tool to generate Markov text. */

// ES Module syntax
// import { MarkovMachine } from "./markov.js";

const fs = require("fs");
const axios = require("axios");
const { MarkovMachine } = require("./markov");

// Input Array
const argvs = process.argv;

// Determine if the input is a file or URL
if (argvs[2] === "file") {
  const path = argvs[3];
  console.log(`... generated text from file '${path}' ...`);

  // Read file
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error("Error reading ", path);
      process.exit(1);
    }
    handleOutput(data);
  });
} else if (argvs[2] === "url") {
  const url = argvs[3];
  console.log(`... generated text from that URL ...`);

  handleURL(url);
} else {
  console.log("Please provide a valid input");
}

// Handle URL input
async function handleURL(url) {
  try {
    const resp = await axios.get(url);
    handleOutput(resp.data);
  } catch (err) {
    console.error(`Error fetching: ${url}. ${err}`);
    process.exit(1);
  }
}

// Handle output to a file
function handleOutput(content) {
  const mm = new MarkovMachine(content);

  fs.writeFile("./output.txt", mm.makeText(), "utf8", function (err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log("Successfully generated Markov text and wrote to file!");
  });
}
