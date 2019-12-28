const stream = require('stream');
const { assert } = require('chai');
const performSort = require('../src/performSort');

describe('#performSort', function() {
  it('should sort a valid file and give lines to callback', function() {
    const callBack = function(sortOutput) {
      assert.deepStrictEqual(sortOutput, {
        sortedContent: 'line1\nline2\nline3'
      });
    };

    const fileStream = new stream.Readable();
    fileStream._read = () => {};

    const createReadStream = function(filePath) {
      assert.strictEqual(filePath, './file');
      return fileStream;
    };
    performSort(['./file'], createReadStream, null, callBack);
    fileStream.emit('data', 'line1\nline2\nline3');
    fileStream.emit('end');
  });

  it('should produce error for a non-existing file', function() {
    const callBack = function(sortOutput) {
      assert.deepStrictEqual(sortOutput, {
        errorMsg: 'sort: No such file or directory'
      });
    };

    const fileStream = new stream.Readable();
    fileStream._read = () => {};

    const createReadStream = function(filePath) {
      assert.strictEqual(filePath, './file');
      return fileStream;
    };
    performSort(['./file'], createReadStream, null, callBack);
    fileStream.emit('error', { code: 'ENOENT' });
  });

  it('should produce error for file not having read permission', function() {
    const callBack = function(sortOutput) {
      assert.deepStrictEqual(sortOutput, {
        errorMsg: 'sort: Permission denied'
      });
    };

    const fileStream = new stream.Readable();
    fileStream._read = () => {};

    const createReadStream = function(filePath) {
      assert.strictEqual(filePath, './file');
      return fileStream;
    };
    performSort(['./file'], createReadStream, null, callBack);
    fileStream.emit('error', { code: 'EACCES' });
  });

  it('should produce error for path of a directory', function() {
    const callBack = function(sortOutput) {
      assert.deepStrictEqual(sortOutput, {
        errorMsg: 'sort: Is a directory'
      });
    };

    const fileStream = new stream.Readable();
    fileStream._read = () => {};

    const createReadStream = function(filePath) {
      assert.strictEqual(filePath, './file');
      return fileStream;
    };
    performSort(['./file'], createReadStream, null, callBack);
    fileStream.emit('error', { code: 'EISDIR' });
  });

  it('should sort stdin content when filePath is not given', () => {
    let count = 0;
    const callBack = function(sortOutput) {
      assert.deepStrictEqual(sortOutput, {
        sortedContent: 'line2\nline3'
      });
      count++;
    };
    const mockedStdin = new stream.Readable();
    mockedStdin._read = () => {};
    performSort([], () => {}, mockedStdin, callBack);
    mockedStdin.emit('data', 'line3\n');
    mockedStdin.emit('data', 'line2');
    mockedStdin.emit('end');
    const calledCount = 1;
    assert.equal(count, calledCount);
  });
});
