const sinon = require('sinon');
const {loadStreamLines} = require('../src/inputReader');

describe('#loadStreamLines()', function() {
  this.afterEach(() => sinon.restore());
  it('should pile data from stream and send lines to callBack', function(done) {
    const interface = {on: () => {}};
    sinon.spy(interface);
    const callBack = sinon.spy();
    loadStreamLines(interface, callBack);
    interface.on.withArgs('data').yield('line1\n');
    interface.on.withArgs('data').yield('line3');
    interface.on.withArgs('end').yield();
    sinon.assert.calledOnceWithExactly(callBack, {lines: ['line1', 'line3']});
    done();
  });
	
  it('should give errorMsg to callBack if error is emitted', function(done) {
    const interface = {on: () => {}};
    sinon.spy(interface);
    const callBack = sinon.spy();
    loadStreamLines(interface, callBack);
    interface.on.withArgs('error').yield({code: 'EACCES'});
    const expected = {errorMsg: 'sort: Permission denied'};
    sinon.assert.calledOnceWithExactly(callBack, expected);
    done();
  });
});
