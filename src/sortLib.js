const handleOutput = function(sortedLines, otpDetails, logger) {
  !otpDetails.optFileGiven && logger(sortedLines.join("\n"));
};

module.exports = { handleOutput };
