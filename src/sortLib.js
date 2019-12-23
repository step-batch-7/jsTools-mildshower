const handleOutput = function(sortedLines, logger) {
  logger(sortedLines.join("\n"));
};

const sort = function(lines) {
  return lines.sort();
};

const processContent = function(logger, lines) {
  const sortedLines = sort(lines);
  handleOutput(sortedLines, logger);
};

const getFileLines = function(filePath, reader, postAction) {
  reader(filePath, "utf8", (error, content) => {
    postAction(content.split("\n"));
  });
};

const getContent = function(inputDetails, reader, postAction) {
  getFileLines(inputDetails.filePath, reader, postAction);
};

const doesFileExist = function(filePath, doesExist) {
  return doesExist(filePath);
};

const parse = function(userArgs) {
  const [filePath] = userArgs;
  return { filePath, isInputValid: true };
};

const performSorting = function(userArgs, helperFuncs) {
  const parsedArgs = parse(userArgs);
  const { contentProcessor, reader, errorLogger, doesExist } = helperFuncs;
  if (parsedArgs.isInputValid) {
    if (!doesFileExist(parsedArgs.filePath, doesExist)) {
      errorLogger(`sort: No such file or directory`);
      return;
    }
    getContent(parsedArgs, reader, contentProcessor);
  }
};

module.exports = {
  handleOutput,
  sort,
  processContent,
  getFileLines,
  getContent,
  doesFileExist,
  parse,
  performSorting
};
