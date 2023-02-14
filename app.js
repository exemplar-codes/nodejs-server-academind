const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Home page</title></head>");
    res.write(
      `<body>
			<form action='/message' method='POST'>
				<input type='text' name='message'
				placeholder='Enter text and press Enter'
				size="40px" />
			</form>
	   </body`
    );
    res.write("</html>");
    res.end();
    return;
  } else if (req.url === "/message" && req.method === "POST") {
    fs.writeFileSync("message.txt", "DUMMY_MESSAGE\n", { flag: "a" });

    res.setHeader("Location", "/"); // redirect to
    res.statusCode = 302; // 302 means redirection. need a 3xx or 201 status for redirection to work

    res.end();
    return;
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Page not found");
});
server.listen(3000, () => console.log("Server running on port 3000"));
