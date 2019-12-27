const parse = function(userArgs) {
  const [filePath] = userArgs;
  return { filePath, isInputValid: true };
};

const loadStreamLines = function(inputStream, onCompletion) {
  let content = "";
  inputStream.on("error", error => {
    const errorMsgs = {
      EACCES: "sort: Permission denied",
      ENOENT: "sort: No such file or directory",
      EISDIR: "sort: Is a directory"
    };
    onCompletion({ errorMsg: errorMsgs[error.code] });
  });
  inputStream.on("data", data => (content += data));
  inputStream.on("end", () => {
    const lines = content.replace(/\n$/, "").split("\n");
    onCompletion({ lines });
  });
};

const getFileStream = function(filePath, createFileStream) {
  return createFileStream(filePath);
};

module.exports = { parse, loadStreamLines, getFileStream };
