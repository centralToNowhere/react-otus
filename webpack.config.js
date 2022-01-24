const path = require("path");

module.exports = {
  entry: "./src/index.ts",
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
        test: /\.ts/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
