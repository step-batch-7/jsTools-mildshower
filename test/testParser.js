const {assert} = require('chai');
const Parser = require('../src/parser');

describe('#parse()', function() {
  const sortOptionSet = {'-r': 'reverse'};
  const parser = new Parser(sortOptionSet);

  it('should parse userArgs and give sortOptions with input validity', () => {
    const actualValue = parser.parse(['./file']);
    assert.deepStrictEqual(actualValue, {
      filePath: './file',
    });
  });

  it('should give filePath as undefined if no filePath is given', function() {
    const actualValue = parser.parse([]);
    assert.deepStrictEqual(actualValue, {
    });
  });
	
  it('should recognize -r option if given before fileName', function() {
    const actualValue = parser.parse(['-r', './file']);
    assert.deepStrictEqual(actualValue, {
      filePath: './file',
      reverse: true
    });
  });
	
  it('should recognize -r option if given after fileName', function() {
    const actualValue = parser.parse(['./file', '-r']);
    assert.deepStrictEqual(actualValue, {
      filePath: './file',
      reverse: true
    });
  });
	
  it('should recognize -r option if -r is repeated', function() {
    const actualValue = parser.parse(['-r', './file', '-r', '-r', '-r']);
    assert.deepStrictEqual(actualValue, {
      filePath: './file',
      reverse: true
    });
  });
	
  it('should recognize invalid option if given', function() {
    const actualValue = parser.parse(['-z', '-r', './file']);
    assert.include(actualValue, {invalidOption: 'z'});
  });
});
