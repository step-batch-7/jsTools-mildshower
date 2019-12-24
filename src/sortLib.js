const loadFileLines = function(filePath, reader, onCompletion) {
  reader(filePath, "utf8", (error, content) => {
    onCompletion(content.split("\n"));
  });
};

const parse = function(userArgs) {
  const [filePath] = userArgs;
  return { filePath, isInputValid: true };
};

const performSort = function(userArgs, fileOperations, onCompletion) {
  const parsedArgs = parse(userArgs);
  const { reader, doesExist } = fileOperations;
  if (parsedArgs.isInputValid) {
    if (!doesExist(parsedArgs.filePath)) {
      onCompletion({
        errorMsg: `sort: No such file or directory`
      });
      return;
    }
    loadFileLines(parsedArgs.filePath, reader, lines => {
      const sortedLines = lines.sort();
      onCompletion({ sortedContent: sortedLines.join("\n") });
    });
  }
};

module.exports = {
  loadFileLines,
  parse,
  performSort
};
