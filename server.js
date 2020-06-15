// env
const VAULT_PATH = "/var/run/secrets/nais.io/vault/environment.env";
require("console-stamp")(console, "[HH:MM:ss.l]");
require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? VAULT_PATH : ".env",
});

// imports
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const fs = require("fs-extra");
const request = require("request");
const jsdom = require("jsdom");
const NodeCache = require("node-cache");
const sanityClient = require("@sanity/client");
// env

const server = express();
server.use(helmet());

const BASE_URL = "/forebygge-sykefravaer";
const { JSDOM } = jsdom;
const prop = "innerHTML";
const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID.trim(),
  dataset: process.env.SANITY_DATASET.trim(),
  token: process.env.SANITY_TOKEN.trim(),
  useCdn: false,
});

// Cache init
const mainCacheKey = "sykefravaer-withMenu";
const backupCacheKey = "sykefravaer-withMenuBackup";
const mainCacheInnholdKey = "sykefravaer-innhold";
const backupCacheInnholdKey = "sykefravaer-innholdBackup";
const mainCacheMeny = new NodeCache({ stdTTL: 900, checkperiod: 90 });
const backupCacheMeny = new NodeCache({ stdTTL: 0, checkperiod: 0 });
const mainCacheInnhold = new NodeCache({
  stdTTL: parseInt(process.env.SANITY_CACHE_TTL),
  checkperiod: parseInt(process.env.SANITY_CACHE_CHECK),
});
const backupCacheInnhold = new NodeCache({ stdTTL: 0, checkperiod: 0 });

//server response to pipeline
server.get("/forebygge-sykefravaer/internal/isAlive", (req, res) =>
  res.sendStatus(200)
);
server.get("/forebygge-sykefravaer/internal/isReady", (req, res) =>
  res.sendStatus(200)
);

const sanityQueryTypes = () => [
  "vi-hjelper-dere-med",
  "digitale-tjenester",
  "oppfolging-fra-nav-arbeidslivssenter",
  "helseIArbeid",
  "ia-avtalen",
];

const htmlinsert = () => [
  { inject: "styles", from: "styles" },
  { inject: "headerWithmenu", from: "header-withmenu" },
  { inject: "footerWithmenu", from: "footer-withmenu" },
  { inject: "megamenuResources", from: "megamenu-resources" },
  { inject: "scripts", from: "scripts" },
];

const url = () =>
  process.env.DECORATOR_EXTERNAL_URL ||
  "https://www.nav.no/dekoratoren/?context=arbeidsgiver&redirectToApp=true&level=Level4/no/";

const querystart = (len) => len === 0;

const querySanity = () => {
  let querystring = "";
  sanityQueryTypes().forEach((elem, index) => {
    querystring = querystring.concat(
      querystart(index) ? `*[_type == '${elem}'` : ` || _type == '${elem}'`
    );
  });
  return querystring.concat("] | order(priority)");
};

const setHeaders = (responsheader) => {
  responsheader.setHeader("Access-Control-Allow-Origin", "*");
  responsheader.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  responsheader.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  responsheader.setHeader("Access-Control-Allow-Credentials", true);
};

const setBuildpathStatic = (subpath) => {
  return express.static(path.join(__dirname, `build/${subpath}`));
};

const serverUse = (staticPath) => {
  return server.use(
    `${BASE_URL}/${staticPath}`,
    setBuildpathStatic(staticPath)
  );
};

const sendDataObj = (json) => {
  return {
    data: json,
    env: [process.env.SANITY_PROJECT_ID, process.env.SANITY_DATASET],
  };
};

const checkbackupCacheInnhold = (res, fetchError) => {
  const cacheBackupInnhold = backupCacheInnhold.get(backupCacheInnholdKey);
  if (cacheBackupInnhold) {
    mainCacheInnhold.set(mainCacheInnholdKey, cacheBackupInnhold);
    res.send(sendDataObj(cacheBackupInnhold));
  } else {
    console.log("fetchError", fetchError);
    res.send(fetchError);
  }
};

const fetchInnhold = (res) => {
  const query = querySanity();
  client
    .fetch(query)
    .then((result) => {
      mainCacheInnhold.set(mainCacheInnholdKey, result);
      backupCacheInnhold.set(backupCacheInnholdKey, result);
      res.send(sendDataObj(result));
    })
    .catch((error) => {
      checkbackupCacheInnhold(res, error);
    });
};

server.get(`${BASE_URL}/innhold/`, (req, res) => {
  setHeaders(res);
  const cacheInnhold = mainCacheInnhold.get(mainCacheInnholdKey);
  cacheInnhold ? res.send(sendDataObj(cacheInnhold)) : fetchInnhold(res);
});

const injectMenuIntoHtml = (menu) => {
  fs.readFile(__dirname + "/build/index.html", "utf8", function (err, html) {
    if (!err) {
      const { document } = new JSDOM(html).window;
      htmlinsert().forEach((element) => {
        document.getElementById(element.inject)[prop] = menu.getElementById(
          element.from
        )[prop];
      });
      const output = `<!DOCTYPE html>${document.documentElement.outerHTML}`;
      mainCacheMeny.set(mainCacheKey, output, 10000);
      backupCacheMeny.set(backupCacheKey, output, 0);
      serveAppWithMenu(output);
    } else {
      checkBackupCache();
    }
  });
};

const getMenu = () => {
  request({ method: "GET", uri: url() }, (error, response, body) => {
    if (!error && response.statusCode >= 200 && response.statusCode < 400) {
      const { document } = new JSDOM(body).window;
      injectMenuIntoHtml(document);
    } else {
      console.log("tried to fetch menu fragments from ", `${url()}`);
      console.log("respons failed, with response ", response);
      console.log("error: ", error);
      checkBackupCache();
    }
  });
};

const serveAppWithMenu = (app) => {
  const staticPaths = [
    "asset-manifest.json",
    "manifest.json",
    "favicon.ico",
    "precache-manifest.*",
    "service-worker.js",
    "permittering.nav.illustrasjon.png",
    "static",
    "index.css",
  ];

  staticPaths.map((path) => serverUse(path));
  server.get([`${BASE_URL}/`], (req, res) => {
    res.send(app);
  });
  setServerPort();
};

const setServerPort = () => {
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log("server listening on port", port);
  });
};

const serveAppWithOutMenu = () => {
  server.use(BASE_URL, express.static(path.join(__dirname, "build")));
  server.get(`${BASE_URL}/*`, (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
  setServerPort();
};

const getMenuAndServeApp = () => {
  mainCacheMeny.get(mainCacheKey, (err, response) => {
    if (!err && response !== undefined) {
      serveAppWithMenu(response);
    } else {
      getMenu();
    }
  });
};

const checkBackupCache = () => {
  backupCacheMeny.get(backupCacheKey, (err, response) => {
    if (!err && response !== undefined) {
      mainCacheMeny.set(mainCacheKey, response, 10000);
      serveAppWithMenu(response);
    } else {
      console.log("failed to fetch menu");
      console.log("cache store empty, serving app with out menu fragments");
      serveAppWithOutMenu();
    }
  });
};

getMenuAndServeApp();
