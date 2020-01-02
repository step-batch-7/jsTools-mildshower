const { assert } = require('chai');
const {parse} = require('../src/parser');

describe('#parse()', function() {
  it('should parse userArgs and give sortOptions with input validity', () => {
    const actualValue = parse(['./file']);
    assert.deepStrictEqual(actualValue, {
      filePath: './file',
      areOptionsInvalid: false,
      reverse: false
    });
  });

  it('should give filePath as undefined if no filePath is given', function() {
    const actualValue = parse([]);
    assert.deepStrictEqual(actualValue, {
      areOptionsInvalid: false,
      reverse: false
    });
  });
	
  it('should recognize -r option if given before fileName', function() {
    const actualValue = parse(['-r', './file']);
    assert.deepStrictEqual(actualValue, {
      filePath: './file',
      areOptionsInvalid: false,
      reverse: true
    });
  });
	
  it('should recognize -r option if given after fileName', function() {
    const actualValue = parse(['./file', '-r']);
    assert.deepStrictEqual(actualValue, {
      filePath: './file',
      areOptionsInvalid: false,
      reverse: true
    });
  });
	
  it('should recognize -r option if -r is repeated', function() {
    const actualValue = parse(['-r', './file', '-r', '-r', '-r']);
    assert.deepStrictEqual(actualValue, {
      filePath: './file',
      areOptionsInvalid: false,
      reverse: true
    });
  });
	
  it('should state invalid args if invalid option is present', function() {
    const actualValue = parse(['-z', '-r', './file']);
    assert.deepStrictEqual(actualValue, {
      areOptionsInvalid: true
    });
  });
});
