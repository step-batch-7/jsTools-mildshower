const {loadStreamLines} = require('./inputReader');
const Parser = require('./parser');

const sortLines = function(lines, options) {
  const sortedLines = lines.sort();
  options.reverse && sortedLines.reverse();
  return sortedLines;
};

const performSort = function(userArgs, createFileStream, stdin, onCompletion) {
  const sortOptionSet = {'-r': 'reverse'};
  const parser = new Parser(sortOptionSet);
  const sortOptions = parser.parse(userArgs);
  const {invalidOption, filePath} = sortOptions;
  if (invalidOption) {
    return onCompletion({errorMsg: `sort: invalid option -- ${invalidOption}`});
  }

  const inputStream = filePath ? createFileStream(filePath) : stdin;

  const finishCallback = ({errorMsg, lines}) => {
    let result = {errorMsg};
    if (lines) {
      result = {sortedContent: sortLines(lines, sortOptions).join('\n')};
    }
    onCompletion(result);
  };

  loadStreamLines(inputStream, finishCallback);
};

module.exports = performSort;
