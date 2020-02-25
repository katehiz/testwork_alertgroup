const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

let NODE_ENV = process.env.NODE_ENV;

const config = {
    entry: {
        build: './src/index.js'
        //,script: './template_html/dev/js/script.js'
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
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => {
                    /node_modules/.test(file)// && !/\.vue\.js/.test(file)
                }
            },
            // это правило будет применяться к обычным файлам `.scss`
            // а также к секциям `<style lang="scss">` в файлах `.vue`
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                    /*,NODE_ENV !== 'production'
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader'*/
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
    // devtool: 'source-map' or 'eval-sourcemap'

};

module.exports = (env, options) => {
    let development = options.mode === 'development'; // -> (boolean)
    config.devtool = development ? 'eval-sourcemap': 'source-map';
    return config;
};