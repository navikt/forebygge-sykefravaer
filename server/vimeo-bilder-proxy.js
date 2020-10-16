const { createProxyMiddleware } = require("http-proxy-middleware");

const VIMEO_BILDER_BASEURL = "https://i.vimeocdn.com";

const FRONTEND_VIDEOBILDER_API_PATH = "/forebygge-sykefravaer/api/thumbnails";

const listeAvTillatteUrler = [
  new RegExp("^" + FRONTEND_VIDEOBILDER_API_PATH + "/filter/overlay?.*"),
];

const proxyConfig = {
  target: VIMEO_BILDER_BASEURL,
  changeOrigin: true,
  pathRewrite: (path, req) => {
    const urlErTillatt =
      listeAvTillatteUrler.filter((regexp) => regexp.test(path)).length > 0;

      return path.replace(FRONTEND_VIDEOBILDER_API_PATH, "");
    if (urlErTillatt) {
    } else {
      throw Error(
        "Path er ikke tillatt, request er ikke videresendt til Vimeo: " + path
      );
    }
  },
  secure: true,
  xfwd: true,
  logLevel: "info",
};

const vimeoBilderProxy = createProxyMiddleware(
  FRONTEND_VIDEOBILDER_API_PATH,
  proxyConfig
);

module.exports = { vimeoBilderProxy };
