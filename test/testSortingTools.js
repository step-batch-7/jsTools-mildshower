const { assert } = require('chai');
const sinon = require('sinon');
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
  it('should pile data from stream and send lines to callBack', function(done) {
    const interface = {on: () => {}};
    sinon.spy(interface);
    const callBack = sinon.spy();
    loadStreamLines(interface, callBack);
    interface.on.withArgs('data').yield('line1\n');
    interface.on.withArgs('data').yield('line3');
    interface.on.withArgs('end').yield();
    sinon.assert.calledOnceWithExactly(callBack, { lines: ['line1', 'line3'] });
    done();
  });
	
  it('should give errorMsg to callBack if error is emitted', function(done) {
    const interface = {on: () => {}};
    sinon.spy(interface);
    const callBack = sinon.spy();
    loadStreamLines(interface, callBack);
    interface.on.withArgs('error').yield({code: 'EACCES'});
    const expected =  { errorMsg: 'sort: Permission denied' };
    sinon.assert.calledOnceWithExactly(callBack, expected);
    done();
  });
});
