const loadFileLines = function(filePath, reader, postAction) {
  reader(filePath, "utf8", (error, content) => {
    postAction(content.split("\n"));
  });
};

const parse = function(userArgs) {
  const [filePath] = userArgs;
  return { filePath, isInputValid: true };
};

const performSort = function(userArgs, helperFuncs) {
  const parsedArgs = parse(userArgs);
  const { reader, errorLogger, doesExist, logger } = helperFuncs;
  if (parsedArgs.isInputValid) {
    if (!doesExist(parsedArgs.filePath)) {
      errorLogger(`sort: No such file or directory`);
      return;
    }
    loadFileLines(parsedArgs.filePath, reader, lines => {
      const sortedLines = lines.sort();
      logger(sortedLines.join("\n"));
    });
  }
};

module.exports = {
  loadFileLines,
  parse,
  performSort
};
