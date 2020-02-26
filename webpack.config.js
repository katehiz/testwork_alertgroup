const path = require("path");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

/* let NODE_ENV = process.env.NODE_ENV; */

const config = {
  entry: {
    build: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "[name].js",
    publicPath: "dist/"
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            js: "babel-loader"
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // loader: "babel-loader"
        use: [{
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }]
      },
      // Будет применяться к обычным файлам `.scss`, а также к секциям `<style lang="scss">` в файлах `.vue`
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // перемещает css в отдельный файл
          // "vue-style-loader", 		 // аналог style-loader, динамическое включение CSS в HTML (<style>
          "css-loader", 				 // интерпретация import/require()
          "postcss-loader",
          "sass-loader"			 	 // понимание синтаксиса scss в css
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // "vue-style-loader"
          "css-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "build.css"
    })
  ]
};

module.exports = (env, options) => {
  let development = options.mode === "development"; // -> (boolean)
  config.devtool = development ? "eval-sourcemap" : "source-map";
  return config;
};
