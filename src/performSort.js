const { loadStreamLines } = require('./inputReader');
const { parse } = require('./parser');

const performSort = function(userArgs, createFileStream, stdin, onCompletion) {
  const { invalidOption, filePath } = parse(userArgs);
  if (invalidOption) {return;}

  const inputStream = filePath ? createFileStream(filePath) : stdin;

  const finishCallback = ({ errorMsg, lines }) => {
    let result = {errorMsg};
    if (lines) {result = {sortedContent: lines.sort().join('\n')};}
    onCompletion(result);
  };

  loadStreamLines(inputStream, finishCallback);
};

module.exports = performSort;
