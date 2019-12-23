const { assert } = require("chai");
const {
  handleOutput,
  sort,
  processContent,
  getFileLines,
  getContent,
  doesFileExist,
  parse,
  performSorting
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
    processContent(loggerMock, ["a", "A", "56", " 56", " "]);
  });
  it("should pass empty string to logger callback if no line is given to sort", function() {
    const loggerMock = function(arg) {
      assert.strictEqual(arg, "");
    };
    processContent(loggerMock, []);
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

describe("#getContent()", function() {
  it("should go for reading file and passing lines to the callback when file path is given", function() {
    const reader = function(filePath, encoding) {
      assert.strictEqual(filePath, "./file");
      assert.strictEqual(encoding, "utf8");
      return "line1\nline2\nline3";
    };
    const callBack = function(content) {
      assert.deepStrictEqual(content, ["line1", "line2", "line3"]);
    };
    getContent({ filePath: "./file" }, reader, callBack);
  });
});

describe("#doesFileExist()", function() {
  it("should give true if the given file exist", function() {
    const existanceChecker = function(filePath) {
      assert.strictEqual(filePath, "./file");
      return true;
    };
    assert.ok(doesFileExist("./file", existanceChecker));
  });

  it("should give false if the given file exist", function() {
    const existanceChecker = function(filePath) {
      assert.strictEqual(filePath, "./file");
      return false;
    };
    assert.notOk(doesFileExist("./file", existanceChecker));
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
  it("should sort a file and give it to logger when file is given and file exists", function() {
    const helperFuncs = {
      reader: function(filePath, encoding) {
        assert.strictEqual(filePath, "./file");
        assert.strictEqual(encoding, "utf8");
        return "line1\nline2\nline3";
      },
      doesExist: function(filePath) {
        assert.strictEqual(filePath, "./file");
        return true;
      },
      contentProcessor: function(lines) {
        assert.deepStrictEqual(lines, ["line1", "line2", "line3"]);
      }
    };
    performSorting(["./file"], helperFuncs);
  });

  it("should give error message if the file in user args does not exist", function() {
    const helperFuncs = {
      doesExist: function(filePath) {
        assert.strictEqual(filePath, "./file");
        return false;
      },
      errorLogger: function(arg) {
        assert.strictEqual(arg, "sort: No such file or directory");
      }
    };
    performSorting(["./file"], helperFuncs);
  });
});
