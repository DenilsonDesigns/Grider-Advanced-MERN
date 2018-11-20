const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const mongoURI = require("./keys/keys").mongoURI;

//DB setup
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true }
);

//APP SETUP
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

//SERVER SETUP
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on:`, port);
