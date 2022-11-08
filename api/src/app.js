const express = require("express");
const router = require("./routes/index.js");
const server = express();
//require("./db.js")

server.use((req, res, next)=>{
    next();
});

server.use("/api", router) //http://localhost:3001/api/

module.exports = server;
