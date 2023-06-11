const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  mode: "production",
  output: {
    filename: "[name].[contentHash].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      // new HtmlWebpackPlugin({
      //   template: "./src/templates/index.html",
        // minify: {
        //   removeAttributeQuotes: true,
        //   collapseWhitespace: true,
        //   removeComments: true
        // }
      // })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/templates/index.html",
      favicon: "./src/favicons/favicon.ico",
      chunks: ["main", "maincss"],
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: "driving.html",
      template: "./src/templates/driving.html",
      favicon: "./src/favicons/favicon.ico",
      chunks: ["driving", "gamecss"],
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: "flappy.html",
      template: "./src/templates/flappy.html",
      favicon: "./src/favicons/favicon.ico",
      chunks: ["flappy", "gamecss"],
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: "drawTrack.html",
      template: "./src/templates/drawTrack.html",
      favicon: "./src/favicons/favicon.ico",
      chunks: ["drawTrack"],
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: "customSimulation.html",
      template: "./src/templates/customSimulation.html",
      favicon: "./src/favicons/favicon.ico",
      chunks: ["customSimulation", "gamecss"],
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          "css-loader", //2. Turns css into commonjs
        ]
      }
    ]
  }
});
