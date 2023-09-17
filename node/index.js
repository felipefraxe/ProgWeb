const fs = require("fs");
const process = require("process");
const http = require("http");

const server = http.createServer((req, res) => {
    fs.readdir(process.argv[2], (err, files) => {
        if(err) {
            console.error(err);
        } else {
            res.writeHead(200,{ "Content-Type" : "text/html;charset=utf-8" });
            files.forEach((file) => res.write(`<p>${file}</p>`));
            res.end();
        }
    });

});

server.listen(3456);