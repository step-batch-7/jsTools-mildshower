const loadFileLines = function(filePath, reader, onCompletion) {
  const errorMsgs = {
    EACCES: "sort: Permission denied",
    ENOENT: "sort: No such file or directory",
    EISDIR: "sort: Is a directory"
  };
  reader(filePath, "utf8", (error, content) => {
    if (error) {
      onCompletion({ errorMsg: errorMsgs[error.code] });
      return;
    }
    onCompletion({ lines: content.split("\n") });
  });
};

const parse = function(userArgs) {
  const [filePath] = userArgs;
  return { filePath, isInputValid: true };
};

const loadStdInLines = function(IOInterface, onCompletion) {
  const lines = [];
  IOInterface.resume();
  IOInterface.on("line", line => lines.push(line));
  IOInterface.on("close", () => onCompletion(lines));
};

const performSort = function(userArgs, reader, IOInterface, onCompletion) {
  const parsedArgs = parse(userArgs);
  if (parsedArgs.isInputValid) {
    if (parsedArgs.filePath) {
      loadFileLines(parsedArgs.filePath, reader, readContent => {
        if (readContent.errorMsg) {
          onCompletion({ errorMsg: readContent.errorMsg });
          return;
        }
        const sortedLines = readContent.lines.sort();
        onCompletion({ sortedContent: sortedLines.join("\n") });
      });
    } else {
      loadStdInLines(IOInterface, lines => {
        const sortedLines = lines.sort();
        onCompletion({ sortedContent: sortedLines.join("\n") });
      });
    }
  }
};

module.exports = {
  loadFileLines,
  parse,
  performSort,
  loadStdInLines
};
