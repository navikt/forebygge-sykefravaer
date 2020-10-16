const { createProxyMiddleware } = require("http-proxy-middleware");

const VIMEO_API_BASEURL = "https://api.vimeo.com";

const FRONTEND_VIDEO_API_PATH = "/forebygge-sykefravaer/api/video";

const listeAvTillatteUrler = [
  new RegExp(
    "^" + FRONTEND_VIDEO_API_PATH + "/users/94865899/albums/[0-9]*/videos"
  ),
];

const proxyConfig = {
  target: VIMEO_API_BASEURL,
  changeOrigin: true,
  pathRewrite: (path, req) => {
    const urlErTillatt =
      listeAvTillatteUrler.filter((regexp) => regexp.test(path)).length > 0;

    if (urlErTillatt) {
      return path.replace(FRONTEND_VIDEO_API_PATH, "");
    } else {
      throw Error(
        "Path er ikke tillatt, request er ikke videresendt til Vimeo: " + path
      );
    }
  },
  secure: true,
  xfwd: true,
  logLevel: "info",
  headers: {
    Authorization: "Bearer " + process.env.VIMEO_TOKEN,
  },
};

const vimeoApiProxy = createProxyMiddleware(
  FRONTEND_VIDEO_API_PATH,
  proxyConfig
);

module.exports = { vimeoApiProxy, FRONTEND_VIDEO_API_PATH };
