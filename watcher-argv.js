const fs = require("fs");

const filename = process.argv[2];
if (!filename) {
    throw Error("Please provide file name");
}

fs.watch(filename, () => {
    console.log(`File ${filename} just changed..`);
});
console.log(`Now watching ${filename} for changes`);
