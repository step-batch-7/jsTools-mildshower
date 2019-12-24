const { createInterface } = require("readline");
const { readFile } = require("fs");
const { performSort } = require("./src/sortLib");

const showOutput = function(sortOutput) {
  sortOutput.errorMsg && console.error(sortOutput.errorMsg);
  sortOutput.sortedContent && console.log(sortOutput.sortedContent);
};

const main = function() {
  const IOInterface = createInterface(process.stdin);
  IOInterface.pause();
  const userArgs = process.argv.slice(2);
  performSort(userArgs, readFile, IOInterface, showOutput);
};

main();
