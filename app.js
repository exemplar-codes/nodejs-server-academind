const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Home page</title></head>");
    res.write("<body><h1>Hello from my Node.js server</h1></body");
    res.write("</html>");
    res.end();
    return;
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>About</title></head>");
    res.write("<body><h1>I am Sanjar</h1></body");
    res.write("</html>");
    res.end();
    return;
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Page not found");
});
server.listen(3000, () => console.log("Server running on port 3000"));
