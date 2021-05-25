const Block =  require(('./block'));

describe('Block', () => {
    let data, lastBlock, block;     // if the variables are not described here , we will have to take const inside the beforeaEach function
    beforeEach(() => {
         data = 'bar';
         lastBlock =Block.genesis();
         block = Block.mineBlock(lastBlock, data);
    })
    it('sets the `data` to match the input',() => {
        expect(block.data).toEqual(data);         // this expects the data to be equal to the block data

    });

    it('sets the `lastHash` to match the hah of the last block', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);       // this is to check the lastHash of the block and then it matches it with the hash value of the last block to which it should actually be equal to.
    });
});

// beforeEach() funchtion helps to run the same code before each of the following unit tests