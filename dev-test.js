const Block = require('./blockchain/block.js');

const fooBlock =  Block.mineBlocks(Block.genesis(), 'foo');
console.log(fooBlock.toString());


