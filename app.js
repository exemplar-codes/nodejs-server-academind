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
			<form action='/message' method='GET'>
				<input type='text' name='message'
				placeholder='Enter text and press Enter'
				size="40px" /> <br />
        <button type="submit">Send as form data</button>
        <button type="button" onclick="sendInputAsJSON(event)">Send as JSON</button>
        </form>
	   </body>`
    );
    res.write(`<script defer>
    function sendInputAsJSON(event) {
      const inputNode = document.getElementsByName("message")[0];
      const button = event.target;
      fetch("http://localhost:3000/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputNode.name,
          value: inputNode.value,
        }),
      })
      .then((resp) => {
        if (!resp.ok) throw new Error("Error occurred, submission failed");
      })
      .then(() => {
        const buttonText = button.innerText;
        button.innerText = "Submitted!";
        setTimeout(() => {
          button.innerText = buttonText;
        }, 2000);
      })
      .catch((err) => {
        const buttonText = button.innerText;
        button.innerText = "Error";
        setTimeout(() => {
          button.innerText = buttonText;
        }, 2000);
      });
    }
    </script>`);
    res.write("</html>");
    res.end();
    return;
  } else if (req.url === "/message" && req.method === "POST") {
    // Form data
    const enteredMessageBuffer = [];
    req.on("data", (chunk) => {
      enteredMessageBuffer.push(chunk);
    });
    req.on("end", () => {
      const receivedRequestBody = enteredMessageBuffer.toString();
      const enteredMessage = receivedRequestBody.split("=").at(-1);
      fs.writeFileSync("message.txt", `${enteredMessage}\n`, {
        flag: "a",
        encoding: "utf-8",
      });

      res.setHeader("Location", "/"); // redirect to
      res.statusCode = 302; // 302 means redirection. need a 3xx or 201 status for redirection to work

      res.end();
    });
    return; // end function to avoid running res ops prematurely, and also res ops after res.end
  } else if (req.url === "/api/message" && req.method === "POST") {
    // JSON
    const enteredMessageBuffer = [];
    req.on("data", (chunk) => {
      enteredMessageBuffer.push(chunk);
    });
    req.on("end", () => {
      const receivedRequestBody = enteredMessageBuffer.toString();
      const { value } = JSON.parse(receivedRequestBody);
      const enteredMessage = value;
      fs.writeFileSync("message.txt", `${enteredMessage}\n`, {
        flag: "a",
        encoding: "utf-8",
      });

      res.setHeader("Location", "/"); // redirect to
      res.statusCode = 302; // 302 means redirection. need a 3xx or 201 status for redirection to work

      res.end();
    });
    return; // end function to avoid running res ops prematurely, and also res ops after res.end
  } else if (req.url.includes("/message") && req.method === "GET") {
    // query params
    const fullUrl = req.headers.host + req.url;
    const { searchParams } = new URL(fullUrl);
    const enteredMessage = searchParams.get("message");

    fs.writeFileSync("message.txt", `${enteredMessage}\n`, {
      flag: "a",
      encoding: "utf-8",
    });

    res.setHeader("Location", "/"); // redirect to
    res.statusCode = 302; // 302 means redirection. need a 3xx or 201 status for redirection to work

    res.end();
    return; // end function to avoid running res ops prematurely, and also res ops after res.end
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Page not found");
});
server.listen(3000, () => console.log("Server running on port 3000"));
