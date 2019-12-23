const { readFile, existsSync } = require("fs");
const { performSort: performSorting } = require("./src/sortLib");

const showOutput = function(sortOutput) {
  displayActions = {
    true: function() {
      console.log(sortOutput.sortedContent);
    },
    false: function() {
      console.error(sortOutput.errorMsg);
    }
  };
  displayActions[sortOutput.doesSortWork]();
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
