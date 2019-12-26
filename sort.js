const { createReadStream } = require("fs");
const { performSort } = require("./src/sortLib");

const showOutput = function(sortOutput) {
  sortOutput.errorMsg && process.stderr.write(sortOutput.errorMsg);
  sortOutput.sortedContent && process.stdout.write(sortOutput.sortedContent);
  process.exit(sortOutput.exitCode);
};

const main = function() {
  const userArgs = process.argv.slice(2);
  performSort(userArgs, createReadStream, process.stdin, showOutput);
};

main();
