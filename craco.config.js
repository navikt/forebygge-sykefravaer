const CracoLessPlugin = require('craco-less');
const decoratorhtmlwebpackplugin = require('./plugins/decoratorhtmlwebpackplugin');
const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@/komponenter': path.resolve(__dirname, 'src/komponenter/'),
            '@/assets': path.resolve(__dirname, 'src/assets/'),
        },
        devserver: {
            open: false,
        }
    },
    devserver: {
      open: false,
    },
    plugins: [
        { plugin: CracoLessPlugin },
        {
            plugin: decoratorhtmlwebpackplugin(
                process.env.ENABLE_EXTERNAL_MENU
            ),
        },
    ],
};
