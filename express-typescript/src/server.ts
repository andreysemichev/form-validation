import express from "express";
import bodyParser from "body-parser";
import handlebars from "express-handlebars";
import path from "path";
import logging from "./config/logging";
import config from "./config/config";
import routes from "./routes";

const NAMESPACE = "Server";
const app = express();

// Шаблонизатор
const hbs = handlebars.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));

// Публичная директория
app.use("/", express.static(path.join(__dirname, "../assets")));

// Промежуточный обработчик
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

// Парсер форм
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Роуты
app.use("/", routes.root);

// 404
app.use((req, res, next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message
  });
});

// Прослушка порта
app.listen(config.server.port, () => {
  logging.info(NAMESPACE, `Server is running ${config.server.url}:${config.server.port}`);
});
