import express from "express";
import serveStatic from "serve-static";
import getRootPath from "@kiwi/common/src/getRootPath.js";
import http from "node:http";

const app = express();
const devAppPath = getRootPath('dist');

app.use('/', serveStatic(devAppPath));

const server = http.createServer(app);

server
    .on('connect', (req) => { console.log('Connection made!') })
    .on('request', (req) => { console.log('Request receieved') })
    .on('error', (e) => { console.log(JSON.stringify(e, null, 2)) })

server.listen(3000, () => {
    console.log(`Welcome to kiwi\nServer is running on http://127.0.0.1:3000`);
});