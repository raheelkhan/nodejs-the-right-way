const EventEmitter = require("events").EventEmitter;

class LDJClient extends EventEmitter {
    constructor(stream) {
        super();
        let buffer = "";
        let self = this;
        stream.on("data", chunk => {
            buffer += chunk;
            let boundry = buffer.indexOf("\n");
            while (boundry !== -1) {
                let input = buffer.substr(0, boundry);
                buffer = buffer.substr(boundry + 1);
                self.emit("message", JSON.parse(input));
                boundry = buffer.indexOf("\n");
            }
        });
    }
}

exports.LDJClient = LDJClient;
exports.connect = stream => {
    return new LDJClient(stream);
};


