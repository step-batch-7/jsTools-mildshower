const stream = require('stream');
const { assert } = require('chai');
const { parse, loadStreamLines } = require('../src/sortingTools');

describe('#parse()', function() {
  it('should parse userArgs and give sortOptions with input validity', () => {
    const actualValue = parse(['./file']);
    assert.deepStrictEqual(actualValue, {
      filePath: './file',
      areOptionsInvalid: false
    });
  });

  it('should give filePath as undefined if no filePath is given', function() {
    const actualValue = parse([]);
    assert.deepStrictEqual(actualValue, {
      filePath: undefined,
      areOptionsInvalid: false
    });
  });
});

describe('#loadStreamLines()', function() {
  it('should pile data on data event and send lines to callBack', function() {
    let count = 0;
    const interface = new stream.Readable();
    interface._read = () => {};
    const callBack = function(lines) {
      assert.deepStrictEqual(lines, { lines: ['line1', 'line3'] });
      count++;
    };
    loadStreamLines(interface, callBack);
    interface.emit('data', 'line1\n');
    interface.emit('data', 'line3');
    interface.emit('end');
    const calledCount = 1;
    assert.equal(count, calledCount);
  });
});
