// webpack.config.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/script.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: 'assets/[name][ext]'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'styles.css' }),
        new HtmlWebpackPlugin({
            template: './src/index.html',   // 👈 указываем правильный путь
            inject: 'body'
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({ extractComments: false }),
            new CssMinimizerPlugin()
        ],
        concatenateModules: true
    },
    devServer: {
        static: { directory: path.resolve(__dirname, 'dist') }, // теперь сервер будет брать index.html из dist
        port: 8080,
        open: true,
        hot: false,
        client: { overlay: true }
    },
    devtool: false
};
