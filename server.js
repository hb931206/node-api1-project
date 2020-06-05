const express = require("express");
const db = require("./data.js");

const server = express();

server.use(express.json());

server.listen(5000, () => {
  console.log("server started on port 5000");
});
