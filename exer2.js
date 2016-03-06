'use strict'

let util = require("util");
let EventEmitter = require("events").EventEmitter;
let through = require('through');
// let RandStream = require('./lib').RandStream;

class RandStringSource extends EventEmitter {
  constructor(RandStreamObj) {
    super ();
    let thisConst = this;
    this.dataString = "";
    this.begin = true;

    this.randStream = RandStreamObj;
    this.randStream.pipe(through(
      function(chunk){
        let splArr = chunk.split('.');
        if(splArr.length > 1){
          if(!thisConst.begin){
            thisConst.dataString += splArr[0];
            thisConst.emitData(thisConst.dataString);
          }
          
          for(let i = 1; i < splArr.length - 1; i++){
            thisConst.dataString += splArr[i]
            thisConst.emitData(splArr[i]);
          }
          thisConst.dataString = splArr[splArr.length-1];
          thisConst.begin = false;
        } else if(!thisConst.begin){
          thisConst.dataString += splArr[0];
        }
      }, 
      function(){
        console.log('__END__');
    }));
  }

  emitData (data) {
       this.emit("data", data);
  }
}

// Consumption
// let instance = new RandStringSource(new RandStream());
// instance.on('data', function (msg) {
//      console.log('from emitter',msg);
// });

module.exports = {
  RandStringSource
};
