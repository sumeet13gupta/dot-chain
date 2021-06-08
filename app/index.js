const express = require('express');
var bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc  = new Blockchain();
const p2pServer = new P2pServer(bc);

app.use(bodyParser.json());

app.get('/blocks',(req,res) =>{
    res.json(bc.chain);
});

app.post('/mine' , (req, res) =>{
    const block = bc.addBlock(req.body.data);
    console.log(`New block Added ${block.toString()}`);

    p2pServer.syncChains();  
    // replaceChain function is with the messageHandler now , so it will automatically update the chain and sync it with the longer one 
    // of the first instance.

    res.redirect('/blocks');
});

app.listen(HTTP_PORT, ()=> console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();