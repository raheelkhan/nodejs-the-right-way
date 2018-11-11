const fs = require("fs");

fs.readFile("target.txt", (error, data) => {
    if (error) {
        throw error;
    }
    console.log(data.toString());
});
