const {createReadStream} = require('fs');
const {stdout, stderr} = process;
const performSort = require('./src/performSort');

const showOutput = function(sortOutput) {
  if (sortOutput.sortedContent !== undefined) {
    stdout.write(sortOutput.sortedContent + '\n');
    return;
  } 
  stderr.write(sortOutput.errorMsg + '\n');
  process.exitCode = 2;
};

const main = function() {
  const [,, ...userArgs] = process.argv;
  performSort(userArgs, createReadStream, process.stdin, showOutput);
};

main();
