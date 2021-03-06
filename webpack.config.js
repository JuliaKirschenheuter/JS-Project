const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 8000
    },
    optimization: {
        // minimize: true, //only if we are not using mode: production
        minimizer: [new UglifyJsPlugin({
            sourceMap: true
        })],
    },
};