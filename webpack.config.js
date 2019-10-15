const HtmlWebpackPlugin = require("html-webpack-plugin");

const dist = __dirname + "/build";

module.exports = {
  entry: ["@babel/polyfill", "./src/index"],
  output: {
    path: dist,
    filename: "bundle.js",
    globalObject: "self"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.worker\.ts$/,
        use: [
          {
            loader: "worker-loader",
            options: { inline: true, name: "[name].js" }
          },
          "babel-loader"
        ]
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      { test: /\.(jpe?g|png|gif|ico)$/i, loader: "file?name=[name].[ext]" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    })
  ]
};
