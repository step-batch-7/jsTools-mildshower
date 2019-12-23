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

module.exports = { handleOutput, sort, processContent, getFileLines };
