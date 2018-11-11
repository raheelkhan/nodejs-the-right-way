const fs = require("fs");

fs.writeFile("target.txt", "A shitty message", error => {
    if (error) {
        throw error;
    }
    console.log("file saved..");
});
