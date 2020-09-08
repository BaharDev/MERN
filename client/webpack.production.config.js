const path = require("path");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
  mode: "production",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "js/[name].js"
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        filename: './index.html'
    })
]
});