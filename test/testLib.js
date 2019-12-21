const { assert } = require("chai");
const { handleOutput } = require("../src/sortLib");

describe("#handleOutput()", function() {
  it("should join given lines and log them if optFile option is false", function() {
    const loggerMock = function(arg) {
      assert.strictEqual(arg, "line1\nline2\nline3");
    };
    handleOutput(
      ["line1", "line2", "line3"],
      { optFileGiven: false },
      loggerMock
    );
  });

  it("should log empty String when no line is given in the array and optFile option is false", function() {
    const loggerMock = function(arg) {
      assert.strictEqual(arg, "");
    };
    handleOutput([], { optFileGiven: false }, loggerMock);
  });
});
