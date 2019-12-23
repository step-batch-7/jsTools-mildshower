const { readFile, existsSync } = require("fs");
const { performSort: performSorting } = require("./src/sortLib");

const showOutput = function(sortOutput) {
  sortOutput.errorMsg && console.error(sortOutput.errorMsg);
  sortOutput.sortedContent && console.error(sortOutput.sortedContent);
};

const main = function() {
  const helperFuncs = {
    reader: readFile,
    doesExist: existsSync
  };
  const userArgs = process.argv.slice(2);
  performSorting(userArgs, helperFuncs, showOutput);
};

main();
