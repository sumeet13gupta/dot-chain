//new ES6 class
const SHA256 = require('crypto-js/sha256');
const DIFFICULTY = 4;
class Block {
      constructor(timestamp, lastHash, hash, data, nonce) {
          this.timestamp = timestamp;
          this.lastHash = lastHash;
          this.hash = hash;
          this.data = data;
          this.nonce = nonce;
      }

      toString() {
          return `Block -
          Timestamp : ${this.timestamp}
          LastHash  : ${this.lastHash.substring(0,10)}
          Hash      : ${this.hash.substring(0,18)}
          nonce     :${this.nonce}
          Data      : ${this.data} `;
      }

      static genesis() {
          return new this('Genesis time', '______','irhsd_hasbu',[],0);
      }

      static mineBlock(lastBlock, data) {
          const timestamp = Date.now();
          const lastHash = lastBlock.hash;
          const hash = Block.hash(timestamp,lastHash, data);
          let nonce = 0;
          
          return new this(timestamp,lastHash,hash,data);
      }


      static hash(timestamp, lastHash, data, nonce) {
          return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
      }

      static blockHash(block) {
          const { timestamp,lastHash,data, nonce} = block;
          return Block.hash(timestamp, lastHash, data, nonce);
      }
}

module.exports = Block;