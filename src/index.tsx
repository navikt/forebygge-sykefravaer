import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as Sentry from "@sentry/browser";
import { getMiljø } from "./utils/miljøUtils";

if (process.env.REACT_APP_MOCK) {
  console.log("========================================");
  console.log("=============== MED MOCK ===============");
  console.log("===DETTE SKAL DU IKKE SE I PRODUKSJON===");
  console.log("========================================");
  require("./mocking/mock");
}

Sentry.init({
  dsn: "https://cdbc9e41249f474b8714aca002e84707@sentry.gc.nav.no/53",
  environment: getMiljø(),
  enabled: getMiljø() !== "local",
});

ReactDOM.render(<App />, document.getElementById("root"));
