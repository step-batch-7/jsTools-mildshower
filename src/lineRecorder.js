class LineRecorder {
  constructor(){
    this.content = '';
  }
  record(chunk){
    this.content += chunk;
  }
  get lines(){
    return this.content.replace(/\n$/, '').split('\n');
  }
}

module.exports = LineRecorder;
