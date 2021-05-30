const Blockchain = require('./blockchain');

describe('Blockchain', () => {
    let bc;

    beforeEach(() => {
        bc = new Blockchain();     // this makes it a new instance of blockchain before each tests, so that previous blockchain does not affect new one.
    });
});