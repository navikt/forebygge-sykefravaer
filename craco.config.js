const CracoLessPlugin = require("craco-less");
const decoratorhtmlwebpackplugin = require("./plugins/decoratorhtmlwebpackplugin");
const path = require("path");

module.exports = {
    devServer: {
        onBeforeSetupMiddleware: (devServer) => {
            devServer.app.get("/forebygge-sykefravaer/api/thumbnail*", (req, res) =>
                res.sendFile("videoThumbnail.jpg", {
                    root: path.join(__dirname, "./src/mocking/"),
                })
            );
        },
    },
    eslint: {
        enable: true,
        mode: "extends",
        configure: {
            parser: "@typescript-eslint/parser",
            parserOptions: {
                sourceType: "module",
            },
            rules: {
                "no-use-before-define": "off",
                // Kan slås på når react-scripts oppgraderer sin avhengighet til eslint https://github.com/typescript-eslint/typescript-eslint/issues/2540
                "@typescript-eslint/no-use-before-define": ["off"],
            },
        },
    },
    plugins: [
        {plugin: CracoLessPlugin},
        {
            plugin: decoratorhtmlwebpackplugin(process.env.ENABLE_EXTERNAL_MENU),
        },
    ],
};
