const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/script.js',               // main entry script.js
    output: {
        filename: 'bundle.js',                // final js
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,    // css to new file
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'styles.css' }) // finale CSS
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({ extractComments: false }), // minifik JS
            new CssMinimizerPlugin()                      // minifik CSS
        ],
        concatenateModules: true
    },
    devtool: false
};
