// import node modules
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

// list the entry
const htmlEntries = [
  {
    input: path.join("src", "index.html"),
    outputFilename: "index.html",
    js: path.join("public", "js", "index"),
  },
];

const htmlFilesConfig = htmlEntries.map((file) => {
  // webpackHtmlPlugin config
  return {
    template: file.input,
    filename: path.join(
      __dirname,
      "build",
      "public",
      "html",
      file.outputFilename
    ),
    chunks: [file.js],
  };
});

// js entrie points
const jsFiles = [
  {
    input: "./src/index.js",
    output: path.join("public", "js", "index"),
  },
];

module.exports = {
  entry: jsFiles.reduce((res, file) => {
    return Object.assign(res, { [file.output]: file.input });
  }, {}),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./build/"),
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            attributes: {
              list: [
                {
                  attribute: "src",
                  type: "src",
                  tag: "img",
                },
              ],
            },
          },
        },
      },
      {
        test: /\.js$/,
        loaders: ["babel-loader"],
        include: path.resolve(__dirname, "../src/js"),
      },
    ],
  },
  optimization: {
    // We no not want to minimize our code.
    minimize: false,
  },
  plugins: [
    ...htmlFilesConfig.map((htmlConfig) => {
      return new HtmlWebpackPlugin(htmlConfig);
    }),
  ],
  stats: "verbose",
  mode: "production",
};
