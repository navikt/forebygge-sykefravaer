require("console-stamp")(console, "[HH:MM:ss.l]");

// env
const VAULT_PATH = "/var/run/secrets/nais.io/vault/environment.env";
require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? VAULT_PATH : ".env",
});

// imports
const { getVimeoApiProxy } = require("./vimeo-api-proxy");
const { getVimeoBilderProxy } = require("./vimeo-bilder-proxy");
const { BASE_PATH } = require("./konstanter");
const getDecorator = require("./decorator");
const mustacheExpress = require("mustache-express");
const express = require("express");
const getCspValue = require('./csp');
const loggingHandler = require("./backend-logger");
const app = express();
const path = require("path");
const buildPath = path.join(__dirname, "../build");
const PORT = process.env.PORT || 3000;

app.engine("html", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", buildPath);
app.use(express.json())

const startServer = (html) => {
  app.use(BASE_PATH + "/", express.static(buildPath, { index: false }));
  app.use((req, res, next) => {
    res.header('X-Frame-Options', 'SAMEORIGIN');
    res.header('X-Xss-Protection', '1; mode=block');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Referrer-Policy', 'no-referrer');
    res.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    res.header('Content-Security-Policy', getCspValue());
    if (process.env.NODE_ENV === 'development') {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      res.header('Access-Control-Allow-Methods', 'GET, POST');
    }
    next();
  });

  app.post(`${BASE_PATH}/api/logger`, loggingHandler )

  app.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
  app.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));

  app.get(`${BASE_PATH}/api/env`, (req, res) => {
    setHeaders(res);
    res.send(
      `${JSON.stringify({
        sanityProjectId: process.env.SANITY_PROJECT_ID,
        sanityDataset: process.env.SANITY_DATASET,
      })}`
    );
  });

  app.use(getVimeoApiProxy());
  app.use(getVimeoBilderProxy());

  app.get(BASE_PATH, (req, res) => {
    res.send(html);
  });

  app.get(BASE_PATH + "/*", (req, res) => {
    res.send(html);
  });

  app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
  });
};

const renderAppMedDecorator = (decoratorFragments) => {
  return new Promise((resolve, reject) => {
    app.render("index.html", decoratorFragments, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
};

const setHeaders = (responsheader) => {
  responsheader.setHeader("Access-Control-Allow-Origin", "*");
  responsheader.setHeader("Access-Control-Allow-Methods", "GET");
  responsheader.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  responsheader.setHeader("Access-Control-Allow-Credentials", true);
};

getDecorator()
  .then(renderAppMedDecorator, (error) => {
    console.error("Kunne ikke hente dekoratør ", error);
    process.exit(1);
  })
  .then(startServer, (error) => {
    console.error("Kunne ikke rendre app ", error);
    process.exit(1);
  });
