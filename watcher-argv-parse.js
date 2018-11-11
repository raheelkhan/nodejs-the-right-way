"use strict";

const fs = require("fs");
const spawn = require("child_process").spawn;
const filename = process.argv[2];

if (!filename) {
    throw Error("Please provide file name");
}

fs.watch(filename, () => {
    let ls = spawn("ls", ["-lh", filename]);
    let output = "";

    ls.stdout.on("data", chunk => {
        output += chunk.toString();
    });

    ls.on("close", () => {
        let parts = output.split(/\s+/);
        console.dir([parts[0], parts[4], parts[8]]);
    });
});

console.log(`Watching ${filename} for changes..`);
