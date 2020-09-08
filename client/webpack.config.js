const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const  merge  = require("webpack-merge");
const { CheckerPlugin } = require("awesome-typescript-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const modeConfig = env => require(`./webpack.${env}.config.js`)(env);
const path = require("path");
const WebpackBar = require("webpackbar");

module.exports = ({ mode }) => {
  return merge({
      stats: "errors-only",
      entry: "./src/index.tsx",
      resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        alias: {
          react: path.resolve("./node_modules/react"),
          "react-dom": path.resolve("./node_modules/react-dom"),
        },
      },
      module: {
        rules: [{
            test: /\.tsx?$/,
            loaders: ["awesome-typescript-loader?transpileOnly=true"],
            exclude: /(node_modules)/,
          },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
          },
          {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader",
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [{
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "img",
              },
            }, ],
          },
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts",
              },
            }, ],
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      plugins: [
        new CheckerPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new WebpackBar(),
      ],
    },
    modeConfig(mode), { mode }
  );
};