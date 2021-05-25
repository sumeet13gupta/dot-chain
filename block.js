//new ES6 class
const SHA256 = require('crypto-js/sha256');


class Block {
      constructor(timestamp, lastHash, hash, data) {
          this.timestamp = timestamp;
          this.lastHash = lastHash;
          this.hash = hash;
          this.data = data;
      }

      toString() {
          return `Block -
          Timestamp : ${this.timestamp}
          LastHash  : ${this.lastHash.substring(0,10)}
          Hash      : ${this.hash.substring(0,18)}
          Data      : ${this.data} `;
      }

      static genesis() {
          return new this('Genesis time', '______','irhsd_hasbu',[]);
      }

      static mineBlocks(lastBlock, data) {
          const timestamp = Date.now();
          const lastHash = lastBlock.hash;
          const hash = 'todo-Hash';
          
          return new this(timestamp,lastHash,hash,data);
      }
}

module.exports = Block;