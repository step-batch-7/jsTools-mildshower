const parse = function(userArgs) {
  const [filePath] = userArgs;
  return { filePath, areOptionsInvalid: false };
};
const errorMsgs = {
  EACCES: "sort: Permission denied",
  ENOENT: "sort: No such file or directory",
  EISDIR: "sort: Is a directory"
};
const loadStreamLines = function(inputStream, onCompletion) {
  let content = "";
  inputStream.on("error", error => {
    const errorMsg = errorMsgs[error.code];
    onCompletion({ errorMsg });
  });
  inputStream.on("data", data => (content += data));
  inputStream.on("end", () => {
    const lines = content.replace(/\n$/, "").split("\n");
    onCompletion({ lines });
  });
};

module.exports = { parse, loadStreamLines };
