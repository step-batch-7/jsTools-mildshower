const { createReadStream } = require("fs");
const performSort = require("./src/performSort");

const showOutput = function(sortOutput) {
  sortOutput.errorMsg && console.error(sortOutput.errorMsg);
  sortOutput.sortedContent && console.log(sortOutput.sortedContent);
  process.exit(sortOutput.exitCode);
};

const main = function() {
  const userArgs = process.argv.slice(2);
  performSort(userArgs, createReadStream, process.stdin, showOutput);
};

main();
