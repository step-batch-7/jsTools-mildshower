const stream = require("stream");
const { assert } = require("chai");
const {
  parse,
  loadStreamLines,
  getFileStream
} = require("../src/sortingTools");

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

describe("#getFileStream()", function() {
  it("should return a file read stream for the given file path", function() {
    const createFileStream = function(filePath) {
      assert.strictEqual(filePath, "./file");
      return "fileStream";
    };
    assert.deepStrictEqual(
      getFileStream("./file", createFileStream),
      "fileStream"
    );
  });
});

describe("#loadStreamLines()", function() {
  it("should take lines on line event of the given interface and send all lines to the callBack", function() {
    let count = 0;
    const interface = new stream.Readable();
    interface._read = () => {};
    const callBack = function(lines) {
      assert.deepStrictEqual(lines, { lines: ["line1", "line2", "line3"] });
      count++;
    };
    loadStreamLines(interface, callBack);
    interface.emit("data", "line1\n");
    interface.emit("data", "line2\n");
    interface.emit("data", "line3");
    interface.emit("end");
    assert.equal(count, 1);
  });
});

// describe.only("#loadStreamLines()", function() {
//   it("should take lines on line event of the given interface and send all lines to the callBack", function() {
//     let count = 0;
//     const interface = new stream.Duplex();
//     interface._read = () => {};
//     const callBack = function(lines) {
//       assert.deepStrictEqual(lines, { lines: ["line1", "line2", "line3"] });
//       count++;
//     };
//     loadStreamLines(interface, callBack);
//     interface.push("line1\n");
//     interface.push("line2\n");
//     interface.push("line3");
//     interface.emit("end");
//     assert.equal(count, 1);
//   });
// });
