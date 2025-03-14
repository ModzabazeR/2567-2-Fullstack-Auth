import { createServer } from "http";
import { parse } from "url";
import next from "next";
import fs from "fs";
import https from "https";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, turbopack: true });
const handle = app.getRequestHandler();

const options = {
  key: fs.readFileSync("./certificates/localhost.key"),
  cert: fs.readFileSync("./certificates/localhost.crt"),
};

app.prepare().then(() => {
  https
    .createServer(options, (req, res) => {
      const parsedUrl = parse(req.url!, true);
      handle(req, res, parsedUrl);
    })
    .listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );
});
