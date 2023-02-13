const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  if (req.url !== "/") {
    // NOT important - just avoid favicon request, https://stackoverflow.com/a/46534622/11392807
    res.statusCode = 404;
    res.end();
    return; // function ends
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "audio/mpeg");

  const musicFile = fs.createReadStream("./perception.mp3", {
    // highWaterMark: 2, // uncomment to see buffering
  });

  //   // A. use stream events
  //   let count = 0;
  //   musicFile.on("end", () => {
  //     console.log("End. Chunks: ", count);
  //     res.end();
  //   });
  //   musicFile.on("data", (chunk) => {
  //     console.log("Chunk #: ", count++);
  //     res.write(chunk);
  //   });

  //   // B. use pipes, easier.
  musicFile.pipe(res); // sufficient

  //   // Using .on for observing
  //   let count = 0;
  //   musicFile.on("end", () => {
  //     console.log("End. Chunks: ", count);
  //     // res.end(); // not needed coz pipes
  //   });
  //   musicFile.on("data", () => {
  //     console.log("Chunk 2: ", count++);
  //     // res.write(chunk); // not needed coz pipe
  //   });
});
// NOTE: navigate to this file's directory before running
server.listen(3000, () => console.log("Server running on port 3000"));
