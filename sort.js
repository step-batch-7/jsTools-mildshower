const { createReadStream } = require('fs');
const {stdout, stderr} = process;
const performSort = require('./src/performSort');

const showOutput = function(sortOutput) {
  if (sortOutput.errorMsg) {
    stderr.write(sortOutput.errorMsg + '\n');
    process.exitCode = 2;
    return;
  } 
  stdout.write(sortOutput.sortedContent + '\n');
};

const main = function() {
  const [,, ...userArgs] = process.argv;
  performSort(userArgs, createReadStream, process.stdin, showOutput);
};

main();
