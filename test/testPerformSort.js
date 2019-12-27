const events = require("events");
const { assert } = require("chai");
const performSort = require("../src/performSort");

describe("#performSort", function() {
  it("should sort a file and pass result to callBack when file is given and file exists", function() {
    const callBack = function(sortOutput) {
      assert.deepStrictEqual(sortOutput, {
        sortedContent: "line1\nline2\nline3",
        exitCode: 0
      });
    };

    const fileStream = new events();

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
        errorMsg: "sort: No such file or directory",
        exitCode: 2
      });
    };

    const fileStream = new events();

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
        errorMsg: "sort: Permission denied",
        exitCode: 2
      });
    };

    const fileStream = new events();

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
        errorMsg: "sort: Is a directory",
        exitCode: 2
      });
    };

    const fileStream = new events();

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
        sortedContent: "line1\nline2\nline3",
        exitCode: 0
      });
      count++;
    };
    const interface = new events();
    performSort([], () => {}, interface, callBack);
    interface.emit("data", "line3\n");
    interface.emit("data", "line1\n");
    interface.emit("data", "line2");
    interface.emit("end");
    assert.equal(count, 1);
  });
});
