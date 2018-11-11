"use strict";

const net = require("net");
const ldj = require("./ldj");
const client = net.connect({ port: 5432 });
const ldjClient = ldj.connect(client);

ldjClient.on("message", message => {
    if (message.type == "watching") {
        console.log(`Now watching ${message.filename}`);
    } else if (message.type == "changed") {
        let date = Date(message.timestamp);
        console.log(`File ${message.filename} has changed at ${date}`);
    } else {
        throw Error(`Unreconginzed message type ${message.type}`);
    }
});
