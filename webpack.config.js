const path = require("path");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  rules: [
    {
      test: /\.js$/,
      enforce: 'pre',
      use: ['source-map-loader'],
    },
  ],
  plugins: [
    new SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
  ]
};