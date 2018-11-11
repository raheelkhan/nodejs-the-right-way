"use strict";

const fs = require("fs");
const net = require("net");

const filename = process.argv[2];
const server = net.createServer(connection => {
    console.log("Subscriber connected");
    connection.write(
        JSON.stringify({ type: "watching", filename: filename }) + "\n"
    );

    let watcher = fs.watch(filename, () => {
        connection.write(
            JSON.stringify({
                type: "changed",
                filename: filename,
                timestamp: Date.now()
            }) + "\n"
        );
    });

    connection.on("close", () => {
        console.log("Subscriber disconnected");
        watcher.close();
    });
});

if (!filename) {
    throw Error("Please provide filename");
}

server.listen(5432, () => {
    console.log("Listeninng for subscribers");
});
