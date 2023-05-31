const path = require("path");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  mode: "development",
  entry: {
    main: "./src/main.ts",
    flappy: "./src/index.ts"
  },
  output: {
    filename: "[name]bundle.js",
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