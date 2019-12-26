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
  let content = "";
  IOInterface.resume();
  IOInterface.on("data", data => (content += data));
  IOInterface.on("end", () => onCompletion({ lines: content.split("\n") }));
};

const sortLines = function(loadedContent, onCompletion) {
  if (loadedContent.errorMsg) {
    onCompletion({ errorMsg: loadedContent.errorMsg, exitCode: 2 });
    return;
  }
  const sortedLines = loadedContent.lines.sort();
  onCompletion({ sortedContent: sortedLines.join("\n"), exitCode: 0 });
};

const performSort = function(userArgs, reader, IOInterface, onCompletion) {
  const parsedArgs = parse(userArgs);
  if (parsedArgs.isInputValid) {
    if (parsedArgs.filePath) {
      loadFileLines(parsedArgs.filePath, reader, loadedContent => {
        sortLines(loadedContent, onCompletion);
      });
      return;
    }
    loadStdInLines(IOInterface, loadedContent => {
      sortLines(loadedContent, onCompletion);
    });
  }
};

module.exports = {
  loadFileLines,
  parse,
  performSort,
  loadStdInLines
};
