#!/usr/bin/env node

require("fs")
    .createReadStream("target.txt")
    .pipe(process.stdout);
