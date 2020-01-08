const assert = require('chai').assert;
const LineRecorder = require('../src/lineRecorder.js');

describe('InputClass', function(){
  describe('#record', function() {
    it('should add new chunk to content', function() {
      const recorder = new LineRecorder();
      recorder.record('hey\n');
      assert.deepStrictEqual(recorder.content, 'hey\n');
      recorder.record('hi\n');
      assert.deepStrictEqual(recorder.content, 'hey\nhi\n');
    });
  });

  describe('#lines', function() {
    it('should give lines from the content', function() {
      const recorder = new LineRecorder();
      recorder.record('hey\n');
      recorder.record('hi\n');
      assert.deepStrictEqual(recorder.lines, ['hey', 'hi']);
    });
  });
});
