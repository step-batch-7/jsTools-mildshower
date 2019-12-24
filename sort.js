const { createInterface } = require("readline");
const { readFile, existsSync } = require("fs");
const { performSort } = require("./src/sortLib");

const showOutput = function(sortOutput) {
  sortOutput.errorMsg && console.error(sortOutput.errorMsg);
  sortOutput.sortedContent && console.log(sortOutput.sortedContent);
};

const main = function() {
  const fileOperations = {
    reader: readFile,
    doesExist: existsSync
  };
  const IOInterface = createInterface(process.stdin);
  IOInterface.pause();
  const userArgs = process.argv.slice(2);
  performSort(userArgs, fileOperations, IOInterface, showOutput);
};

main();
