const path = require("path");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  mode: "development",
  entry: {
    driving: "./src/driving.ts",
    main: "./src/main.ts",
    // flappy: "./src/index.ts",
  },
  output: {
    filename: "[name][hash]bundle.js",
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