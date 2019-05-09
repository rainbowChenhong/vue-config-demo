const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
    },
    devServer: {
        proxy: {
            '/company/*': {
                target: 'lhttp://localhost:8088', //对应自己的接口
                changeOrigin: true,
                // ws: true,
                // pathRewrite: {
                //     '^/api': ''
                // }
            }
        }
    },
    css: {
        loaderOptions: {
            stylus: {
                loaders: [{
                    test: /\.styl$/,
                    loader: 'css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/'
                }]
            }
        }

    }
}