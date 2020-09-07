const path = require("path");

module.exports = () => ({
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "js/[name].js",
  },
  mode: "development",
  devtool: "source-map",
});
