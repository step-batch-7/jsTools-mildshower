const events = require("events");
const { assert } = require("chai");
const {
  loadFileLines,
  parse,
  performSort,
  loadStdInLines
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

  it("should give filePath as undefined if no filePath is given", function() {
    const actualValue = parse([]);
    assert.deepStrictEqual(actualValue, {
      filePath: undefined,
      isInputValid: true
    });
  });
});

describe("#performSort", function() {
  it("should sort a file and pass result to callBack when file is given and file exists", function() {
    const callBack = function(sortOutput) {
      assert.deepStrictEqual(sortOutput, {
        sortedContent: "line1\nline2\nline3"
      });
    };
    const fileOperations = {
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
    performSort(["./file"], fileOperations, null, callBack);
  });

  it("should pass error flag and error to callBack if the file in user args does not exist", function() {
    const callBack = function(sortOutput) {
      assert.deepStrictEqual(sortOutput, {
        errorMsg: "sort: No such file or directory"
      });
    };
    const fileOperations = {
      doesExist: function(filePath) {
        assert.strictEqual(filePath, "./file");
        return false;
      }
    };
    performSort(["./file"], fileOperations, null, callBack);
  });

  it("should pass sorted content from stdIn interface if no filePath is given", function() {
    let count = 0;
    const callBack = function(sortOutput) {
      assert.deepStrictEqual(sortOutput, {
        sortedContent: "line1\nline2\nline3"
      });
      count++;
    };
    const interface = new events();
    interface.resume = () => {};
    performSort([], {}, interface, callBack);
    interface.emit("line", "line3");
    interface.emit("line", "line1");
    interface.emit("line", "line2");
    interface.emit("end");
    assert.equal(count, 1);
  });
});

describe("#loadStdInLines()", function() {
  it("should take lines on line event of the given interface and send all lines to the callBack", function() {
    const interface = new events();
    interface.resume = () => {};
    const callBack = function(lines) {
      assert.deepStrictEqual(lines, ["line1", "line2", "line3"]);
    };
    loadStdInLines(interface, callBack);
    interface.emit("line", "line1");
    interface.emit("line", "line2");
    interface.emit("line", "line3");
    interface.emit("end");
  });
});
