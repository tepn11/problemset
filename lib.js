'use strict';

let stream = require('stream'),
  randtoken = require('rand-token');

class RandStream extends stream.Readable {

  constructor () {
    super ({
      encoding: 'utf8',
      objectMode: false,
      read: () => {
        setTimeout(() => {
          let chunk = randtoken.generate(
            Math.floor(5 + Math.random() * 25),
            '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.'
          );
          this.push(chunk, 'utf8');
        }, Math.random() * 1000);
      }
    });

  }
}

module.exports = {
  RandStream
};
