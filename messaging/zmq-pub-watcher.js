"use strict";

const fs = require("fs");
const zmq = require("zmq");

const publisher = zmq.socket("pub");
const filename = process.argv[2];

fs.watch(filename, () => {
    publisher.send(
        JSON.stringify({
            type: "changed",
            filename: filename,
            timestamp: Date.now()
        })
    );
});

publisher.bind("tcp://*:5432", () => {
    console.log("Listening on port 5432");
});
