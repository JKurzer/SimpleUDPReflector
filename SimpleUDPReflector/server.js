'use strict';
const dgram = require('node:dgram');

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.error(`server error:\n${err.stack}`);
});

server.on('message', (msg, rinfo) => {
    if (msg.byteLength == 32) {
        server.send(msg, rinfo.port, rinfo.address);
    }
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});


server.bind(40000);