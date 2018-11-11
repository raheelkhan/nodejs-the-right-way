"use strict";

const net = require("net");

const server = net.createServer(connection => {
    console.log("Subscriber connected");
    connection.write('{"type": "changed", "filename": "targ');

    let timer = setTimeout(() => {
        connection.write('et.text", "timestamp": 1358175758495}' + "\n");
    }, 1000);

    connection.on("close", () => {
        clearTimeout(timer);
        console.log("Subscriber disconnected");
    });
});

server.listen(5432, () => {
    console.log("Testing listerning server for subscribers");
});
