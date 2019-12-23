const { assert } = require("chai");
const {
  loadFileLines,
  parse,
  performSort: performSorting
} = require("../src/sortLib");

describe("#getFileLines()", function() {
  it("should pass the fileLines of given file path to the callBack", function() {
    const callBack = function(content) {
      assert.deepStrictEqual(content, ["line1", "line2", "line3"]);
    };
    const reader = function(filePath, encoding, callBack) {
      assert.strictEqual(filePath, "./file");
      assert.strictEqual(encoding, "utf8");
      callBack(null, "line1\nline2\nline3");
    };
    loadFileLines("./file", reader, callBack);
  });
});

describe("#parse()", function() {
  it("should parse the user given args and give needed properties for sort and input validation", function() {
    const actualValue = parse(["./file"]);
    assert.deepStrictEqual(actualValue, {
      filePath: "./file",
      isInputValid: true
    });
  });
});

describe("#performSorting", function() {
  it("should sort a file and pass result to callBack when file is given and file exists", function() {
    const callBack = function(sortOutput) {
      assert.deepStrictEqual(sortOutput, {
        sortedContent: "line1\nline2\nline3"
      });
    };
    const helperFuncs = {
      reader: function(filePath, encoding, callBack) {
        assert.strictEqual(filePath, "./file");
        assert.strictEqual(encoding, "utf8");
        callBack(null, "line1\nline2\nline3");
      },
      doesExist: function(filePath) {
        assert.strictEqual(filePath, "./file");
        return true;
      }
    };
    performSorting(["./file"], helperFuncs, callBack);
  });

  it("should pass error flag and error to callBack if the file in user args does not exist", function() {
    const callBack = function(sortOutput) {
      assert.deepStrictEqual(sortOutput, {
        errorMsg: "sort: No such file or directory"
      });
    };
    const helperFuncs = {
      doesExist: function(filePath) {
        assert.strictEqual(filePath, "./file");
        return false;
      }
    };
    performSorting(["./file"], helperFuncs, callBack);
  });
});
