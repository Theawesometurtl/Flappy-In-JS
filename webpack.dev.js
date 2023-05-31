const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      favicon: "./src/favicon.ico",
      chunks: ["main", "maincss"]
    }),
    new HtmlWebpackPlugin({
      filename: "flappy.html",
      template: "./src/flappy.html",
      favicon: "./src/favicon.ico",
      chunks: ["flappy"]
    }),
    new HtmlWebpackPlugin({
      filename: "driving.html",
      template: "./src/driving.html",
      favicon: "./src/favicon.ico",
      chunks: ["driving"]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader", //3. Inject styles into DOM
          "css-loader", //2. Turns css into commonjs
        ]
      }
    ]
  }
});