const stream = require("stream");
const { assert } = require("chai");
const performSort = require("../src/performSort");

describe("#performSort", function() {
  it("should sort a file and pass result to callBack when file is given and file exists", function() {
    const callBack = function(sortOutput) {
      assert.deepStrictEqual(sortOutput, {
        sortedContent: "line1\nline2\nline3"
      });
    };

    const fileStream = new stream.Readable();
    fileStream._read = () => {};

    const createReadStream = function(filePath) {
      assert.strictEqual(filePath, "./file");
      return fileStream;
    };
    performSort(["./file"], createReadStream, null, callBack);
    fileStream.emit("data", "line1\nline2\nline3");
    fileStream.emit("end");
  });

  it("should pass error flag and error to callBack if the given file does not exist", function() {
    const callBack = function(sortOutput) {
      assert.deepStrictEqual(sortOutput, {
        errorMsg: "sort: No such file or directory"
      });
    };

    const fileStream = new stream.Readable();
    fileStream._read = () => {};

    const createReadStream = function(filePath) {
      assert.strictEqual(filePath, "./file");
      return fileStream;
    };
    performSort(["./file"], createReadStream, null, callBack);
    fileStream.emit("error", { code: "ENOENT" });
  });

  it("should pass error flag and error to callBack if the given file does not have read permission", function() {
    const callBack = function(sortOutput) {
      assert.deepStrictEqual(sortOutput, {
        errorMsg: "sort: Permission denied"
      });
    };

    const fileStream = new stream.Readable();
    fileStream._read = () => {};

    const createReadStream = function(filePath) {
      assert.strictEqual(filePath, "./file");
      return fileStream;
    };
    performSort(["./file"], createReadStream, null, callBack);
    fileStream.emit("error", { code: "EACCES" });
  });

  it("should pass error flag and error to callBack if the given path is a dirPath", function() {
    const callBack = function(sortOutput) {
      assert.deepStrictEqual(sortOutput, {
        errorMsg: "sort: Is a directory"
      });
    };

    const fileStream = new stream.Readable();
    fileStream._read = () => {};

    const createReadStream = function(filePath) {
      assert.strictEqual(filePath, "./file");
      return fileStream;
    };
    performSort(["./file"], createReadStream, null, callBack);
    fileStream.emit("error", { code: "EISDIR" });
  });

  it("should pass sorted content from stdIn interface if no filePath is given", function() {
    let count = 0;
    const callBack = function(sortOutput) {
      assert.deepStrictEqual(sortOutput, {
        sortedContent: "line1\nline2\nline3"
      });
      count++;
    };
    const mockedStdin = new stream.Readable();
    mockedStdin._read = () => {};
    performSort([], () => {}, mockedStdin, callBack);
    mockedStdin.emit("data", "line3\n");
    mockedStdin.emit("data", "line1\n");
    mockedStdin.emit("data", "line2");
    mockedStdin.emit("end");
    assert.equal(count, 1);
  });
});
