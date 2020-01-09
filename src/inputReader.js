const LineRecorder = require('./lineRecorder.js');

const errorMsgs = {
  EACCES: 'sort: Permission denied',
  ENOENT: 'sort: No such file or directory',
  EISDIR: 'sort: Is a directory'
};
const loadStreamLines = function(inputStream, onCompletion) {
  const recorder = new LineRecorder;

  inputStream.on('error', error => {
    const errorMsg = errorMsgs[error.code];
    onCompletion({errorMsg});
  });

  inputStream.on('data', data => recorder.record(data));
  inputStream.on('end', () => onCompletion({lines: recorder.lines}));
};

module.exports = {loadStreamLines};
