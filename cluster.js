const cluster = require("cluster");

if (cluster.isMaster) {
    for (let i = 1; i <= 10; i++) {
        cluster.fork();
    }
}

cluster.on("online", worker => {
    console.log(`Worker ${worker.process.pid} is online`);
});

cluster.on("exit", (worker, code, signal) => {
    console.log(
        `Worker ${
            worker.process.pid
        } exited with code ${code} and signal ${signal}`
    );
});
