const processContent = function(logger, lines) {
  const sortedLines = lines.sort();
  logger(sortedLines.join("\n"));
};

const getFileLines = function(filePath, reader, postAction) {
  reader(filePath, "utf8", (error, content) => {
    postAction(content.split("\n"));
  });
};

const parse = function(userArgs) {
  const [filePath] = userArgs;
  return { filePath, isInputValid: true };
};

const performSorting = function(userArgs, helperFuncs) {
  const parsedArgs = parse(userArgs);
  const { contentProcessor, reader, errorLogger, doesExist } = helperFuncs;
  if (parsedArgs.isInputValid) {
    if (!doesExist(parsedArgs.filePath)) {
      errorLogger(`sort: No such file or directory`);
      return;
    }
    getFileLines(parsedArgs.filePath, reader, contentProcessor);
  }
};

module.exports = {
  processContent,
  getFileLines,
  parse,
  performSorting
};
