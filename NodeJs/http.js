const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("<h1>Welcome to the Homepage!</h1>");
    res.end();
  }
  if (req.url === "/user") {
    res.write("Welcome user Emmanuel!");
    res.end();
  }
});

server.listen(3000, () => console.log("Server is up and Running!"));
