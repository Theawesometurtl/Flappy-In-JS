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
    filename: "[name][hash].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/templates/index.html",
      favicon: "./src/favicons/favicon.ico",
      chunks: ["main", "maincss"]
    }),
    new HtmlWebpackPlugin({
      filename: "driving.html",
      template: "./src/templates/driving.html",
      favicon: "./src/favicons/favicon.ico",
      chunks: ["driving"]
    }),
    new HtmlWebpackPlugin({
      filename: "flappy.html",
      template: "./src/templates/flappy.html",
      favicon: "./src/favicons/favicon.ico",
      chunks: ["flappy"]
    }),
    new HtmlWebpackPlugin({
      filename: "drawTrack.html",
      template: "./src/templates/drawTrack.html",
      favicon: "./src/favicons/favicon.ico",
      chunks: ["drawTrack"]
    }),
    new HtmlWebpackPlugin({
      filename: "customSimulation.html",
      template: "./src/templates/customSimulation.html",
      favicon: "./src/favicons/favicon.ico",
      chunks: ["customSimulation"]
    }),
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