// These are the dependencies of our main JS file
// This file will be used to run a web server for our API
// Using ExpressJS
const http = require("http");
const express = require("express");

// We need to use this file to route our items requests
const itemsRouter = require("./routes/items");
// Initialize the express framework
const app = express();
// And set it to use JSON responses
app.use(express.json());
// 'Link' the route /items to its router
app.use("/items", itemsRouter);
// And create a basic response if someone request the root dir of our server
app.use("/", function(req, res) {
  res.send("todo api works");
});

// Now lets create the server using express
const server = http.createServer(app);
// And listening this port
const port = 3000;
server.listen(port);
console.debug("Server listening on port " + port);
