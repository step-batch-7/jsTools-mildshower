const handleOutput = function(sortedLines, logger) {
  logger(sortedLines.join("\n"));
};

const sort = function(lines) {
  return lines.sort();
};

const processContent = function(lines, logger) {
  const sortedLines = sort(lines);
  handleOutput(sortedLines, logger);
};

const getFileLines = function(filePath, reader, postAction) {
  const content = reader(filePath, "utf8");
  postAction(content.trim().split("\n"));
};

const getContent = function(inputDetails, reader, postAction) {
  getFileLines(inputDetails.filePath, reader, postAction);
};

const doesFileExist = function(filePath, existanceChecker) {
  return existanceChecker(filePath);
};

const parse = function(userArgs) {
  const [filePath] = userArgs;
  return { filePath, isInputValid: true };
};

const perfortSorting = function(userArgs) {};

module.exports = {
  handleOutput,
  sort,
  processContent,
  getFileLines,
  getContent,
  doesFileExist,
  parse
};
