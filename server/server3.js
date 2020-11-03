// env
require("console-stamp")(console, "[HH:MM:ss.l]");

// imports
const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID.trim(),
  dataset: process.env.SANITY_DATASET.trim(),
  token: process.env.SANITY_TOKEN.trim(),
  useCdn: false,
});

const sanityQueryTypes = () => [
  "vi-hjelper-dere-med",
  "digitale-tjenester",
  "webinar-og-kurs",
  "oppfolging-fra-nav-arbeidslivssenter",
  "helseIArbeid",
  "ia-avtalen",
];
const querystart = (len) => len === 0;

const querySanity = () => {
  let querystring = "";
  sanityQueryTypes().forEach((elem, index) => {
    querystring = querystring.concat(
      querystart(index) ? `*[(_type == '${elem}'` : ` || _type == '${elem}'`
    );
  });
  return querystring.concat(
    ') && !(_id in path("drafts.**"))] | order(priority)'
  );
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


const sendDataObj = (json) => {
  console.log("[DEBUG] poject_id", process.env.SANITY_PROJECT_ID);
  console.log("[DEBUG] dataset", process.env.SANITY_DATASET);
  return {
    data: json,
    env: [process.env.SANITY_PROJECT_ID, process.env.SANITY_DATASET],
  };
};

const fetchInnhold = () => {
  console.log("[DEBUG] fetchInnhold");
  const query = querySanity();
  client
    .fetch(query)
    .then((result) => {
      console.log("[DEBUG] result: ", sendDataObj(result));
    })
    .catch((error) => {
      console.log("[DEBUG] error: ", error);
    });
};

console.log("[DEBUG] project_id", process.env.SANITY_PROJECT_ID.trim());
console.log("[DEBUG] dataset", process.env.SANITY_DATASET.trim());

fetchInnhold();