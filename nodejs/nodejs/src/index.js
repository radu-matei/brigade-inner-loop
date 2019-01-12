const http = require("http");
const express = require("express");
const hello = require("./hello");


const app = express();
app.get("/hello", (req, res) => {
    res.send(hello.world());
});


app.get("/healthz", (req, res)=> {
    res.send("OK");
});

http.createServer(app).listen("8081");