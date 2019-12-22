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

module.exports = { handleOutput, sort, processContent };
