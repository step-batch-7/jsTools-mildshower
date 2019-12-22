const { assert } = require("chai");
const { handleOutput, sort } = require("../src/sortLib");

describe("#handleOutput()", function() {
  it("should join given lines and give the string to logger if optFile option is false", function() {
    const loggerMock = function(arg) {
      assert.strictEqual(arg, "line1\nline2\nline3");
    };
    handleOutput(
      ["line1", "line2", "line3"],
      { optFileGiven: false },
      loggerMock
    );
  });

  it("should give empty String to logger when no line is given in the array and optFile option is false", function() {
    const loggerMock = function(arg) {
      assert.strictEqual(arg, "");
    };
    handleOutput([], { optFileGiven: false }, loggerMock);
  });
});

describe("sort()", function() {
  it("should sort given lines when the no sorting option is specified", function() {
    const actualValue = sort(["a", "A", "56", " 56", " "]);
    assert.deepStrictEqual(actualValue, [" ", " 56", "56", "A", "a"]);
  });
  it("should give empty array if an empty array is given to sort", function() {
    const actualValue = sort([]);
    assert.deepStrictEqual(actualValue, []);
  });
});
