const path = require("path");

module.exports = {
  entry: "./src/lesson2/index.ts",
  devtool: "source-map",
  resolve: {
    extensions: [".ts"],
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
