const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  entry: {
    driving: "./src/driving.ts",
    maincss: "./src/styling/main.css",
    main: "./src/main.ts",
    flappy: "./src/flappy.ts",
    customSimulation: "./src/customSimulation.ts",
    drawTrack: "./src/drawTrack.ts",
    vendor: "./src/vendor.ts",
    gamecss: "./src/styling/game.css"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs"
          }
        }
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  }
};