const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const Dotenv = require('dotenv-webpack');
module.exports = (env, argv) => {
    const prod = argv.mode === "production";
    
    return {
        mode: prod ? "production" : "development",
        devtool: prod ? "hidden-source-map" : "eval",
        entry: "./src/index.tsx",
        output: {
            path: path.join(__dirname, "/build"),
            filename: "[name].js",
            publicPath: '/'
        },
        devServer: {
            static: {
                directory: path.join(__dirname, '/'),
            },
            compress: true,
            port: 3001,
            hot: true,
        },
        resolve: {
            plugins: [new TsconfigPathsPlugin(),],
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: ["babel-loader", "ts-loader"],
                },
                {
                    test: /.css?$/,
                    exclude: [],
                    use: ["style-loader", "css-loader", "postcss-loader"],
                },
            ],
        },
        plugins: [
            new webpack.ProvidePlugin({
                React: "react",
            }),
            new InterpolateHtmlPlugin({
                PUBLIC_URL: './public', // can modify `static` to another name or get it from `process`
            }),
            new HtmlWebpackPlugin({
                baseUrl: '/',
                template: './public/index.html',
                // favicon: './public/favicon.ico',
                // publicPath: './public',
                minify: prod ? {
                    collapseWhitespace: true, // 빈칸 제거
                    removeComments: true, // 주석 제거
                } : false,
            }),
            new Dotenv({
                path: './.env',
                safe: true
            }),
            new CleanWebpackPlugin(),
        ],
    }
};