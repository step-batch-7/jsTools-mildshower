const loadFileLines = function(filePath, reader, postAction) {
  reader(filePath, "utf8", (error, content) => {
    postAction(content.split("\n"));
  });
};

const parse = function(userArgs) {
  const [filePath] = userArgs;
  return { filePath, isInputValid: true };
};

const performSort = function(userArgs, helperFuncs, callBack) {
  const parsedArgs = parse(userArgs);
  const { reader, doesExist } = helperFuncs;
  if (parsedArgs.isInputValid) {
    if (!doesExist(parsedArgs.filePath)) {
      callBack({
        errorMsg: `sort: No such file or directory`
      });
      return;
    }
    loadFileLines(parsedArgs.filePath, reader, lines => {
      const sortedLines = lines.sort();
      callBack({ sortedContent: sortedLines.join("\n") });
    });
  }
};

module.exports = {
  loadFileLines,
  parse,
  performSort
};
