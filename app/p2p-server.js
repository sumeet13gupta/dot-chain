const WebSocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(','):[] ;console.log(`peers to be connected : ${peers}`);
class P2pServer {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen(){
        const server = new WebSocket.Server({ port: P2P_PORT });
        server.on('connection', socket => this.connectSocket(socket));
        this.connectToPeers();
        console.log(`Listening for peer-to-peer connections on : ${P2P_PORT}`);
    }

    connectToPeers(){
        peers.forEach(peer => {
            // ws://localhost:5001
            const socket = new WebSocket(peer);
            socket.on('open', ()=> this.connectSocket(socket));
        });
    }

    connectSocket(socket) {
        this.sockets.push(socket);
        console.log(this.sockets.length);
        console.log("Socket connected");

        this.messageHandler(socket);

        this.sendChain(socket);
    }

    messageHandler(socket){
        socket.on('message', message => {
            const data = JSON.parse(message);

            this.blockchain.replaceChain(data);
        });
    }

    sendChain(socket){
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    syncChains(){
        this.sockets.forEach(socket => this.sendChain(socket));
    }
}

module.exports =P2pServer; 


//  npm run dev
//  HTTP_port=3002 P2P_port=5002 PEERS=ws://localhost:5001 npm run dev
//  HTTP_port=3003 P2P_port=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev
//  HTTP_port=3004 P2P_port=5004 PEERS=ws://localhost:5001,ws://localhost:5002,ws://localhost:5003 npm run dev

// command looks like this :
// HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001 ws://localhost:5002 npm run dev