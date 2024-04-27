'use strict';

const MSG_SIZE_A = 56;
const MSG_SIZE_B = 52;
const MSG_SIZE_C = 28;
const MSG_SIZE_D = 32;
const dgram = require('node:dgram');

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
});

server.on('message', (msg, rinfo) => {
  // It's unusual for me to leave code commented out in an application.
  // Normally, I would add a flag that made the server more verbose, but this
  // would be the only statement affected. This achieves as much, or more, and
  // so I'm leaving it here, commented out. console.log(`Received message from
  // IP:PORT = [${rinfo.address}:${rinfo.port}], Message = "${msg}", length is
  // ${msg.byteLength}, sending back to source? ${msg.byteLength == MSG_SIZE}`);
  if (msg.byteLength == MSG_SIZE_A || msg.byteLength == MSG_SIZE_B ||
      msg.byteLength == MSG_SIZE_C || msg.byteLength == MSG_SIZE_D) {
    server.send(msg, rinfo.port, rinfo.address);
  }
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});


server.bind(40000);
