const { createReadStream } = require("fs");
const performSort = require("./src/performSort");

const showOutput = function(sortOutput) {
  if (sortOutput.errorMsg) {
    console.error(sortOutput.errorMsg);
    process.exitCode = 2;
  } else console.log(sortOutput.sortedContent);
};

const main = function() {
  const userArgs = process.argv.slice(2);
  performSort(userArgs, createReadStream, process.stdin, showOutput);
};

main();
