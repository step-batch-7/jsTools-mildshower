const parse = function(userArgs) {
  const [filePath] = userArgs;
  return { filePath, areOptionsInvalid: false };
};

exports.parse = parse;
