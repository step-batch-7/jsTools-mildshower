const parse = function(userArgs) {
  const [filePath] = userArgs;
  return { filePath, isInputValid: true };
};

const callOnError = function(error, callBack) {
  const errorMsgs = {
    EACCES: "sort: Permission denied",
    ENOENT: "sort: No such file or directory",
    EISDIR: "sort: Is a directory"
  };
  callBack({ errorMsg: errorMsgs[error.code] });
};

const loadStreamLines = function(inputStream, onCompletion) {
  let content = "";
  inputStream.on("data", data => (content += data));
  inputStream.on("error", error => {
    callOnError(error, onCompletion);
  });
  inputStream.on("end", () => onCompletion({ lines: content.split("\n") }));
};

const sortLines = function(loadedContent) {
  if (loadedContent.errorMsg) {
    return { errorMsg: loadedContent.errorMsg, exitCode: 2 };
  }
  const sortedLines = loadedContent.lines.sort();
  return { sortedContent: sortedLines.join("\n"), exitCode: 0 };
};

const performSort = function(userArgs, getReadStream, stdin, onCompletion) {
  const parsedArgs = parse(userArgs);
  if (parsedArgs.isInputValid) {
    let inputStream = stdin;
    if (parsedArgs.filePath) {
      inputStream = getReadStream(parsedArgs.filePath);
    }
    loadStreamLines(inputStream, loadedContent => {
      onCompletion(sortLines(loadedContent));
    });
  }
};

module.exports = {
  parse,
  performSort,
  loadStreamLines
};
