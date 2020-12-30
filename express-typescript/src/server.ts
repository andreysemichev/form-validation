import express from "express";
import bodyParser from "body-parser";
import handlebars from "express-handlebars";
import path from "path";
import logging from "./config/logging";
import config from "./config/config";
import routes from "./routes";

const NAMESPACE = "Server";
const app = express();

/** Using the handlebars */
const hbs = handlebars.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));

/** Using the public directory */
app.use("/", express.static(path.join(__dirname, "../assets")));

/** Logging the request and default locals */
app.use((req, res, next) => {
  logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`, NAMESPACE);

  res.on("finish", () => {
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`, NAMESPACE);
  });

  const locals = res.locals;

  locals.title = config.server.projectName;
  locals.styles = ["/styles/main.css"];
  locals.scripts = ["/scripts/main.js"];

  next();
});

/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Rules of our API */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

/** Routes */
app.use("/", routes.root);

/** Error handling */
app.use((req, res, next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message
  });
});

/** Create the server */
app.listen(config.server.port, () => {
  logging.info(NAMESPACE, `Server is running ${config.server.url}:${config.server.port}`);
});
