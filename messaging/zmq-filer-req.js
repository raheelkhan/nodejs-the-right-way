"use strict";

const zmq = require("zmq");
const filename = process.argv[2];
const requester = zmq.socket("req");

requester.on("message", data => {
    let response = JSON.parse(data);
    console.log(response);
});

requester.connect("tcp://127.0.0.1:5433");

for (let i = 1; i <= 3; i++) {
    console.log(`Sending request for ${filename}`);
    requester.send(
        JSON.stringify({
            path: filename
        })
    );
}
