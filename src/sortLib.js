const handleOutput = function(sortedLines, otpDetails, logger) {
  !otpDetails.optFileGiven && logger(sortedLines.join("\n"));
};

const sort = function(lines) {
  return lines.sort();
};

module.exports = { handleOutput, sort };
