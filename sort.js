const { readFile, existsSync } = require("fs");
const { performSort: performSorting } = require("./src/sortLib");

const showOutput = function(sortOutput) {
  if (sortOutput.doesSortWork) {
    console.log(sortOutput.sortedContent);
    return;
  }
  console.error(sortOutput.errorMsg);
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
