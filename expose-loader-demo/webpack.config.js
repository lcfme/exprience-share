const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('../webpackConfig/webpack.base.conf');


module.exports = merge(baseWebpackConfig, {
    entry: {
        index: path.resolve(__dirname, './index.js'),
    },
    output: {
        path: path.resolve(__dirname),
        filename: '[name].compiled.js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: require.resolve('jquery'),
                use: [
                    {
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }, {
                        loader: 'expose-loader',
                        options: '$'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ]
});