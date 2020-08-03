const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const dotenv = require("dotenv").config();
const daConn = require("./database/database");

app.use(express.json());

//Middleware
app.use("/", require("./routes/router"));

app.get("/test", (req, res) => {
    res.send("test API!");
});
server.listen(process.env.APP_PORT, () => {
    console.log("Server listening to:" + process.env.APP_PORT);
});