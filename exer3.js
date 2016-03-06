'use strict';

class ResourceManager{
  constructor(cnt){
    this.maxCount = cnt;
    this.resourceList = [];
    this.idCount=0;
  }
  
  borrow(callback){
    let resource = this.addResource();
    callback(resource);
  }
  
  addResource(){
    if (this.resourceList.length >= this.maxCount) {
      console.log('Maximum number of resources has been reached.');
      return false;
    } else {
      let id = this.idCount;
      let resource = new ResourceObj(id, this);
      this.resourceList.push({id: id, resource: resource});
      this.idCount += 1;
      return resource;
    }
    
  }
  
  delResource(id){
    let resourceList = this.resourceList;
    this.resourceList.forEach(function(k,v){
      if(k.id == id){
        resourceList.splice(v,1);
      }
    });
    console.log('Resource deleted. id: ',id);
  }
}

class ResourceObj {
  constructor(id, refObj) {
    this.id = id
    this.callerObj = refObj;
    console.log('Resource object created. id:',this.id);
  }
  
  release(){
    this.callerObj.delResource(this.id);
  }
}

// let pool = new ResourceManager(2);
// console.log('START');
// 
// let timestamp = Date.now();
// 
// pool.borrow((res) => {
//   console.log('RES: 1');
// 
//   setTimeout(() => {
//     res.release();
//   }, 500);
// });
// 
// pool.borrow((res) => {
//   console.log('RES: 2');
// });
// 
// pool.borrow((res) => {
//   console.log('RES: 3');
//   console.log('DURATION: ' + (Date.now() - timestamp));
// });

module.exports = {
  ResourceManager
}
