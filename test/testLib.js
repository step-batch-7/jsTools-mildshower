const { assert } = require("chai");
const {
  handleOutput,
  sort,
  processContent,
  getFileLines
} = require("../src/sortLib");

describe("#handleOutput()", function() {
  it("should join given lines and give the string to logger", function() {
    const loggerMock = function(arg) {
      assert.strictEqual(arg, "line1\nline2\nline3");
    };
    handleOutput(["line1", "line2", "line3"], loggerMock);
  });

  it("should give empty String to logger when no line is given in the array", function() {
    const loggerMock = function(arg) {
      assert.strictEqual(arg, "");
    };
    handleOutput([], loggerMock);
  });
});

describe("#sort()", function() {
  it("should sort given lines when the no sorting option is specified", function() {
    const actualValue = sort(["a", "A", "56", " 56", " "]);
    assert.deepStrictEqual(actualValue, [" ", " 56", "56", "A", "a"]);
  });
  it("should give empty array if an empty array is given to sort", function() {
    const actualValue = sort([]);
    assert.deepStrictEqual(actualValue, []);
  });
});

describe("#processContent()", function() {
  it("should sort given lines and give them to logger callback after joining", function() {
    const loggerMock = function(arg) {
      assert.strictEqual(arg, " \n 56\n56\nA\na");
    };
    processContent(["a", "A", "56", " 56", " "], loggerMock);
  });
  it("should pass empty string to logger callback if no line is given to sort", function() {
    const loggerMock = function(arg) {
      assert.strictEqual(arg, "");
    };
    processContent([], loggerMock);
  });
});

describe("#getFileLines()", function() {
  it("should pass the fileLines of given file path to the callBack", function() {
    const reader = function(filePath, encoding) {
      assert.strictEqual(filePath, "./file");
      assert.strictEqual(encoding, "utf8");
      return "line1\nline2\nline3";
    };
    const callBack = function(content) {
      assert.deepStrictEqual(content, ["line1", "line2", "line3"]);
    };
    getFileLines("./file", reader, callBack);
  });
});
