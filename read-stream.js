const fs = require("fs");

const stream = fs.createReadStream(process.argv[2]);
stream.on("data", chunk => {
    process.stdout.write(chunk);
});
stream.on("error", error => {
    process.stderr.write(`Error: ${error.message}`);
});
