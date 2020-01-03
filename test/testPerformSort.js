const sinon = require('sinon');
const performSort = require('../src/performSort');

describe('#performSort()', function() {

  context('Valid Options', function(){

    it('should sort a valid file and give lines to callback', function() {
      const callBack = sinon.spy();
      const fileStream = {on: () => {}};
      sinon.spy(fileStream);
      const createReadStream = sinon.stub();
      createReadStream.withArgs('./file').returns(fileStream);
      performSort(['./file'], createReadStream, null, callBack);
      fileStream.on.withArgs('data').yield('line1\nline3\nline2');
      fileStream.on.withArgs('end').yield();
      const expected = {sortedContent: 'line1\nline2\nline3'};
      sinon.assert.calledWithExactly(callBack, expected);
    });  

    it('should produce error for a non-existing file', function() {
      const callBack = sinon.spy();
      const fileStream = {on: () => {}};
      sinon.spy(fileStream);
      const createReadStream = sinon.stub();
      createReadStream.withArgs('./file').returns(fileStream);
      performSort(['./file'], createReadStream, null, callBack);
      fileStream.on.withArgs('error').yield({code: 'ENOENT'});
      const expected = {errorMsg: 'sort: No such file or directory'};
      sinon.assert.calledWithExactly(callBack, expected);
    });  

    it('should produce error for file not having read permission', function() {
      const callBack = sinon.spy();
      const fileStream = {on: () => {}};
      sinon.spy(fileStream);
      const createReadStream = sinon.stub();
      createReadStream.withArgs('./file').returns(fileStream);
      performSort(['./file'], createReadStream, null, callBack);
      fileStream.on.withArgs('error').yield({code: 'EACCES'});
      const expected = {errorMsg: 'sort: Permission denied'};
      sinon.assert.calledWithExactly(callBack, expected);
    });  

    it('should produce error for path of a directory', function() {
      const callBack = sinon.spy();
      const fileStream = {on: () => {}};
      sinon.spy(fileStream);
      const createReadStream = sinon.stub();
      createReadStream.withArgs('./file').returns(fileStream);
      performSort(['./file'], createReadStream, null, callBack);
      fileStream.on.withArgs('error').yield({code: 'EISDIR'});
      const expected = {errorMsg: 'sort: Is a directory'};
      sinon.assert.calledWithExactly(callBack, expected);
    });  

    it('should sort stdin content when filePath is not given', () => {
      const stdin = {on: () => {}};
      sinon.spy(stdin);
      const callBack = sinon.spy();
      performSort([], null, stdin, callBack);
      stdin.on.withArgs('data').yield('line3\n');
      stdin.on.withArgs('data').yield('line2');
      stdin.on.withArgs('end').yield();
      const expected = {sortedContent: 'line2\nline3'};
      sinon.assert.calledOnceWithExactly(callBack, expected);
    });

    it('should sort in reverse order when -r is given', () => {
      const stdin = {on: () => {}};
      sinon.spy(stdin);
      const callBack = sinon.spy();
      performSort(['-r'], null, stdin, callBack);
      stdin.on.withArgs('data').yield('line3\n');
      stdin.on.withArgs('data').yield('line2');
      stdin.on.withArgs('end').yield();
      const expected = {sortedContent: 'line3\nline2'};
      sinon.assert.calledOnceWithExactly(callBack, expected);
    });
  });
	
  context('Invalid Option', function(){
    it('should give invalid option message for invalid option', () => {
      const callBack = sinon.spy();
      performSort(['-r', '-y'], null, null, callBack);
      const expected = {errorMsg: 'sort: invalid option -- y'};
      sinon.assert.calledOnceWithExactly(callBack, expected);
    });
  });
});
