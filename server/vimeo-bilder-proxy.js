const { createProxyMiddleware } = require("http-proxy-middleware");

const VIMEO_BILDER_BASEURL = "https://i.vimeocdn.com";
// https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F965995475_200x150.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png

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
