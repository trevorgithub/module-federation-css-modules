const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");

const deps = require("./package.json").dependencies;
module.exports = function (_env, argv) {
  const devMode = argv.mode === "development";
  return {
    output: {
      publicPath: "auto",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 3004,
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: devMode,
                modules: {
                  localIdentName: "[name]__[local]__[hash:base64:5]",
                },
                esModule: false,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: devMode,
                postcssOptions: {
                  modules: true,
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: devMode,
                sassOptions: {
                  includePaths: [path.resolve("./")],
                },
              },
            },
          ],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
      new ModuleFederationPlugin({
        name: "button_container",
        filename: "remoteEntry.js",
        remotes: {
          "my-button": "button@http://localhost:3003/remoteEntry.js"
        },
        exposes: {
          "./ButtonContainer": "./src/ButtonContainer",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new ExternalTemplateRemotesPlugin(),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
    devtool: "source-map",
  };
};
