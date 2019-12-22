const handleOutput = function(sortedLines, logger) {
  logger(sortedLines.join("\n"));
};

const sort = function(lines) {
  return lines.sort();
};

module.exports = { handleOutput, sort };
