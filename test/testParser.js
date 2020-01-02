const { assert } = require('chai');
const {parse} = require('../src/parser');

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
