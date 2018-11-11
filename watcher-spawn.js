"use strict";

const fs = require("fs");
const spawn = require("child_process").spawn;
const filename = process.argv[2];

if (!filename) {
    throw Error("Please provide file name");
}

fs.watch(filename, () => {
    let ls = spawn("ls", ["-lh", filename]);
    ls.stdout.pipe(process.stdout);
});

console.log(`Watching ${filename} for changes..`);
