"use strict";

const zmq = require("zmq");
const subscriber = zmq.socket("sub");

subscriber.subscribe("");
subscriber.on("message", data => {
    let message = JSON.parse(data);
    let date = new Date(message.timestamp);
    console.log(`file ${message.type} has changed at ${date}`);
});
subscriber.connect("tcp://localhost:5432");
