const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const Dotenv = require('dotenv-webpack');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { EsbuildPlugin } = require('esbuild-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const smp = new SpeedMeasurePlugin();
module.exports = (env, argv) => {
    const prod = argv.mode === "production";
    
    return smp.wrap({
        mode: prod ? "production" : "development",
        devtool: prod ? false : "eval-cheap-module-source-map",
        entry: "./src/index.tsx",
        cache: {type: (prod ? 'filesystem' : 'memory')},
        output: {
            path: path.join(__dirname, "/build"),
            filename: "[name]-[chunkhash].js",
            publicPath: '/',
            pathinfo: false,
            clean: true
        },
        optimization: {
            removeAvailableModules: false,
            removeEmptyChunks: false,
            splitChunks: false,
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
        optimization: {
            minimizer: [
                new EsbuildPlugin({
                    target: 'es2015',
                    css: true
                })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.[jt]sx?$/,
                    exclude:'/node_modules/',
                    use: [{
                        loader: 'esbuild-loader',
                        options: {
                            loader: 'tsx',
                            target: 'es2015'
                        }
                    }],
                },
                {
                    test: /.css?$/,
                    exclude:'/node_modules/',
                    use: ["style-loader", "css-loader", "postcss-loader"],
                }
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
    })
};