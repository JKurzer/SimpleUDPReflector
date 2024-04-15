'use strict';

const MSG_SIZE = 56;
const dgram = require('node:dgram');

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.error(`server error:\n${err.stack}`);
});

server.on('message', (msg, rinfo) => {
    console.log(`Received message from IP:PORT = [${rinfo.address}:${rinfo.port}], Message = "${msg}", length is ${msg.byteLength}, sending back to source? ${msg.byteLength == MSG_SIZE}`);
    if (msg.byteLength == MSG_SIZE) {
        server.send(msg, rinfo.port, rinfo.address);
    }
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});


server.bind(40000);
