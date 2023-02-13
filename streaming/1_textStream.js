const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url !== "/") {
    // avoid favicon request, https://stackoverflow.com/a/46534622/11392807
    res.statusCode = 404;
    res.end();
    return; // function ends
  }

  res.statusCode = 200;

  // following 2 lines, needed for text stream webkit bug workaround, https://stackoverflow.com/a/34187352/11392807
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("X-Content-Type-Options", "nosniff");

  // for streaming HTML, just setting "Content-Type" is enough.
  // In Chrome, even that can be ommitted(since the default is text / html, afaict)

  // for streaming MP3, only "Content-Type" "audio/mpeg" is needed.

  let count = 5;
  const repeater = setInterval(() => {
    if (count === 0) {
      clearInterval(repeater);
      res.end("\nDone");
    } else {
      if(count === 5)
      res.write(`Loading in ${count}`);
      else
        res.write(`, ${count}`)
      count--;
    }
  }, 1000);
});
server.listen(3000, () => console.log("Server running on port 3000"));
