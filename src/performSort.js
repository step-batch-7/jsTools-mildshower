const { parse, loadStreamLines } = require('./sortingTools');

const performSort = function(userArgs, createFileStream, stdin, onCompletion) {
  const { areOptionsInvalid, filePath } = parse(userArgs);
  if (areOptionsInvalid) {
    return;
  }

  const inputStream = filePath ? createFileStream(filePath) : stdin;

  const finishCallback = ({ errorMsg, lines }) => {
    let result;
    if (errorMsg) {result = { errorMsg };}
    else {result = { sortedContent: lines.sort().join('\n') };}
    onCompletion(result);
  };

  loadStreamLines(inputStream, finishCallback);
};

module.exports = performSort;
