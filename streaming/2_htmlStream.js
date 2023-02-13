const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url !== "/") {
    // avoid favicon request, https://stackoverflow.com/a/46534622/11392807
    res.statusCode = 404;
    res.end();
    return; // function ends
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  res.write(`<body><h1>Static content</h1><p></p><body>`); // ignore HTML best practices for this demo
  let count = 5;
  const repeater = setInterval(() => {
    if (count === 0) {
      clearInterval(repeater);
      res.end(`
      <script defer>document.body.getElementsByTagName('p')[0].innerText = "Done";</script>`);
    } else {
      res.write(
        `<script defer>document.body.getElementsByTagName('p')[0].innerText = "Loading in  ${count} seconds";</script>`
      );
      count--;
    }
  }, 1000);
});
server.listen(3000, () => console.log("Server running on port 3000"));
