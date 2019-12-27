const { parse, loadStreamLines, getFileStream } = require("./sortingTools");

const performSort = function(userArgs, createFileStream, stdin, onCompletion) {
  const parsedArgs = parse(userArgs);
  if (parsedArgs.isInputValid) {
    let inputStream = stdin;
    if (parsedArgs.filePath) {
      inputStream = getFileStream(parsedArgs.filePath, createFileStream);
    }
    loadStreamLines(inputStream, loadedContent => {
      if (loadedContent.errorMsg) {
        onCompletion({ errorMsg: loadedContent.errorMsg, exitCode: 2 });
        return;
      }
      const sortedLines = loadedContent.lines.sort();
      onCompletion({ sortedContent: sortedLines.join("\n"), exitCode: 0 });
    });
  }
};

module.exports = performSort;
