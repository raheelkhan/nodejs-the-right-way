"use strict";

const fs = require("fs");
const zmq = require("zmq");
const responder = zmq.socket("rep");

responder.on("message", data => {
    let request = JSON.parse(data);
    console.log(`Request recieved to get ${request.path}`);

    fs.readFile(request.path, (error, content) => {
        console.log("Sending response content");
        responder.send(
            JSON.stringify({
                content: content.toString(),
                timestamp: Date.now(),
                pid: process.pid
            })
        );
    });
});

responder.bind("tcp://127.0.0.1:5433", error => {
    console.log("Listening for zmq requests");
});

process.on("SIGINT", () => {
    console.log("Shutting down...");
    responder.close();
});
