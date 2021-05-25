const Block = require('./block');

const fooBlock =  Block.mineBlocks(Block.genesis(), 'foo');
console.log(fooBlock.toString());


/*
const block = new Block('foo','bar','zoo','baz');
console.log(block.toString());
console.log(Block.genesis().toString());
*/