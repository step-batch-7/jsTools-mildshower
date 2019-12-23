const loadFileLines = function(filePath, reader, sortFileLines) {
  reader(filePath, "utf8", (error, content) => {
    sortFileLines(content.split("\n"));
  });
};

const parse = function(userArgs) {
  const [filePath] = userArgs;
  return { filePath, isInputValid: true };
};

const performSort = function(userArgs, helperFuncs, showOutput) {
  const parsedArgs = parse(userArgs);
  const { reader, doesExist } = helperFuncs;
  if (parsedArgs.isInputValid) {
    if (!doesExist(parsedArgs.filePath)) {
      showOutput({
        errorMsg: `sort: No such file or directory`
      });
      return;
    }
    loadFileLines(parsedArgs.filePath, reader, lines => {
      const sortedLines = lines.sort();
      showOutput({ sortedContent: sortedLines.join("\n") });
    });
  }
};

module.exports = {
  loadFileLines,
  parse,
  performSort
};
