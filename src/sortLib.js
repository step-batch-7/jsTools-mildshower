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
  callBack({ errorMsg: errorMsgs[error.code], exitCode: 2 });
};

const loadStreamLines = function(inputStream, onCompletion) {
  let content = "";
  inputStream.on("data", data => (content += data));
  inputStream.on("error", error => {
    callOnError(error, onCompletion);
  });
  inputStream.on("end", () => onCompletion({ lines: content.split("\n") }));
};

const sortLines = function(loadedContent, onCompletion) {
  if (loadedContent.errorMsg) {
    onCompletion({ errorMsg: loadedContent.errorMsg, exitCode: 2 });
    return;
  }
  const sortedLines = loadedContent.lines.sort();
  onCompletion({ sortedContent: sortedLines.join("\n"), exitCode: 0 });
};

const performSort = function(userArgs, getReadStream, stdin, onCompletion) {
  const parsedArgs = parse(userArgs);
  if (parsedArgs.isInputValid) {
    let inputStream = stdin;
    if (parsedArgs.filePath) {
      inputStream = getReadStream(parsedArgs.filePath);
    }
    loadStreamLines(inputStream, loadedContent => {
      sortLines(loadedContent, onCompletion);
    });
  }
};

module.exports = {
  parse,
  performSort,
  loadStreamLines
};
