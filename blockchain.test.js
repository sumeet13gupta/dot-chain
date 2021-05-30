const Blockchain = require('./blockchain');
const Block =  require('./block');

describe('Blockchain', () => {
    let bc, bc2;

    beforeEach(() => {
        bc = new Blockchain();     // this makes it a new instance of blockchain before each tests, so that previous blockchain does not affect new one.
        bc2 = new Blockchain();
    });

    it ('starts with the genesis block', ()=> {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('add a new block', ()=> {
        const data = 'foo';
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });

    it('validate a valid chain', ()=> {
        bc2.addBlock('foo');

        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('invalidates  a chain with a corrupt genesis block', ()=> {
        bc2.chain[0].data = 'bad data';

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidates a corrupt chain', ()=> {
        bc2.addBlock('foo');
        bc2.chain[1].data = 'Not foo';

        expect(bc2.isValidChain(bc2.chain)).toBe(false);
    });


});

